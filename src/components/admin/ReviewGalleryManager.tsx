"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { upload as uploadBlob } from "@vercel/blob/client";
import {
  ExternalLink,
  Eye,
  EyeOff,
  ImageIcon,
  Images,
  Loader2,
  Save,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { adminFetch } from "@/lib/admin/api";

type ReviewImage = {
  id: string;
  category_id: number;
  image_url: string;
  alt_text: string;
  is_published: boolean;
  sort_order: number;
};

type PortfolioItem = {
  id: string;
  title: string;
  review_url: string;
  sort_order: number;
};

const categoryIds = [1, 2, 3] as const;
const pageSize = 30;

function ReviewPreview({ item }: { item: ReviewImage }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [item.image_url]);

  if (!item.image_url || failed) {
    return (
      <div className="flex h-full items-center justify-center bg-slate-100 text-slate-400">
        <div className="text-center">
          <ImageIcon className="mx-auto" size={34} />
          <p className="mt-2 text-xs">ไม่พบรูป</p>
        </div>
      </div>
    );
  }

  return (
    // รองรับทั้งไฟล์เดิมใน public และ URL จาก Vercel Blob
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.image_url}
      alt={item.alt_text || "ภาพรีวิวลูกค้า"}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}

function categoryFromReviewUrl(reviewUrl: string) {
  const match = reviewUrl.match(/\/review\/(1|2|3)(?:\/|$|\?)/);
  return match ? Number(match[1]) : null;
}

export default function ReviewGalleryManager() {
  const [items, setItems] = useState<ReviewImage[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [visibleLimit, setVisibleLimit] = useState(pageSize);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setMessage("");
    try {
      const [gallery, portfolio] = await Promise.all([
        adminFetch<ReviewImage[]>("/api/admin/review-gallery"),
        adminFetch<PortfolioItem[]>("/api/admin/portfolio"),
      ]);
      setItems(gallery);
      setPortfolioItems(portfolio);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "โหลดภาพรีวิวไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    setVisibleLimit(pageSize);
  }, [activeCategory]);

  const categoryTitles = useMemo(() => {
    const titles = new Map<number, string>();
    for (const item of [...portfolioItems].sort((a, b) => a.sort_order - b.sort_order)) {
      const id = categoryFromReviewUrl(item.review_url || "");
      if (id && !titles.has(id)) titles.set(id, item.title);
    }
    return titles;
  }, [portfolioItems]);

  const activeItems = useMemo(
    () =>
      items
        .filter((item) => item.category_id === activeCategory)
        .sort((a, b) => a.sort_order - b.sort_order),
    [activeCategory, items],
  );

  const visibleItems = activeItems.slice(0, visibleLimit);

  function titleFor(categoryId: number) {
    return categoryTitles.get(categoryId) || `หมวดรีวิว ${categoryId}`;
  }

  function countFor(categoryId: number) {
    return items.filter((item) => item.category_id === categoryId).length;
  }

  function update(id: string, patch: Partial<ReviewImage>) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  async function run(key: string, action: () => Promise<void>, successMessage: string) {
    setBusy(key);
    setMessage("");
    try {
      await action();
      setMessage(successMessage);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "เกิดข้อผิดพลาด");
    } finally {
      setBusy("");
    }
  }

  async function uploadFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) return;

    if (files.length > 30) {
      setMessage("อัปโหลดได้ครั้งละไม่เกิน 30 รูป");
      return;
    }

    const invalid = files.find(
      (file) => !file.type.startsWith("image/") || file.size > 10 * 1024 * 1024,
    );
    if (invalid) {
      setMessage("รองรับเฉพาะรูปภาพ และแต่ละไฟล์ต้องมีขนาดไม่เกิน 10 MB");
      return;
    }

    await run(
      "upload",
      async () => {
        let nextOrder = Math.max(0, ...activeItems.map((item) => Number(item.sort_order) || 0)) + 1;

        for (let index = 0; index < files.length; index += 1) {
          const file = files[index];
          setUploadProgress(`กำลังอัปโหลด ${index + 1}/${files.length}: ${file.name}`);

          const safeName = file.name
            .normalize("NFKD")
            .replace(/[^a-zA-Z0-9._-]/g, "-")
            .replace(/-+/g, "-");
          const pathname = `cms/review/category-${activeCategory}/${Date.now()}-${index}-${safeName || "review-image"}`;
          const blob = await uploadBlob(pathname, file, {
            access: "public",
            handleUploadUrl: "/api/admin/upload",
            multipart: file.size > 4 * 1024 * 1024,
          });

          await adminFetch("/api/admin/review-gallery", {
            method: "POST",
            body: JSON.stringify({
              category_id: activeCategory,
              image_url: blob.url,
              alt_text: `${titleFor(activeCategory)} รูปที่ ${nextOrder}`,
              is_published: true,
              sort_order: nextOrder,
            }),
          });
          nextOrder += 1;
        }

        setUploadProgress("");
        await load();
        setVisibleLimit((current) => Math.max(current, activeItems.length + files.length));
      },
      `อัปโหลด ${files.length} รูปเรียบร้อยแล้ว`,
    );
    setUploadProgress("");
  }

  async function save(item: ReviewImage) {
    await run(
      `save-${item.id}`,
      async () => {
        await adminFetch("/api/admin/review-gallery", {
          method: "PATCH",
          body: JSON.stringify({
            id: item.id,
            data: {
              category_id: item.category_id,
              image_url: item.image_url,
              alt_text: item.alt_text,
              is_published: item.is_published,
              sort_order: Number(item.sort_order),
            },
          }),
        });
        await load();
      },
      "บันทึกภาพรีวิวเรียบร้อยแล้ว",
    );
  }

  async function remove(item: ReviewImage) {
    if (!window.confirm("ลบรูปรีวิวนี้ออกจากระบบหรือไม่?")) return;

    await run(
      `delete-${item.id}`,
      async () => {
        await adminFetch("/api/admin/review-gallery", {
          method: "DELETE",
          body: JSON.stringify({ id: item.id }),
        });
        setItems((current) => current.filter((currentItem) => currentItem.id !== item.id));
      },
      "ลบภาพรีวิวเรียบร้อยแล้ว",
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/70">
        <Loader2 className="animate-spin text-[#a6784f]" size={32} />
      </div>
    );
  }

  return (
    <section className="space-y-6 border-t border-slate-200 pt-10">
      <div className="rounded-3xl bg-[#20202b] p-6 text-white shadow-lg md:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Images className="text-[#deb18a]" size={28} />
              <h2 className="text-2xl font-bold">ภาพรีวิวในแต่ละหมวด</h2>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              อัปโหลดและจัดการรูปที่แสดงในหน้า /review/1, /review/2 และ /review/3
              โดยแยกเป็น 3 หมวดตามตัวอย่างผลงานของเรา
            </p>
          </div>

          <a
            href={`/review/${activeCategory}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <ExternalLink size={17} />
            เปิดหน้าหมวด {activeCategory}
          </a>
        </div>
      </div>

      {message && (
        <div className="rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
          {message}
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-3">
        {categoryIds.map((categoryId) => {
          const active = activeCategory === categoryId;
          return (
            <button
              key={categoryId}
              type="button"
              onClick={() => setActiveCategory(categoryId)}
              className={`rounded-2xl border p-4 text-left transition ${
                active
                  ? "border-[#a6784f] bg-[#fff7ef] shadow-sm"
                  : "border-slate-200 bg-white hover:border-[#deb18a]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-[#a6784f]">หมวด {categoryId}</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                  {countFor(categoryId)} รูป
                </span>
              </div>
              <p className="mt-2 line-clamp-2 font-semibold text-slate-900">
                {titleFor(categoryId)}
              </p>
              <p className="mt-1 text-xs text-slate-500">/review/{categoryId}</p>
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 md:p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              หมวด {activeCategory}: {titleFor(activeCategory)}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              มีทั้งหมด {activeItems.length} รูป • เปิดแสดง {activeItems.filter((item) => item.is_published).length} รูป
            </p>
          </div>

          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#deb18a] px-5 py-3 font-semibold text-[#20202b] transition hover:bg-[#c89b72]">
            {busy === "upload" ? (
              <Loader2 size={19} className="animate-spin" />
            ) : (
              <UploadCloud size={19} />
            )}
            {busy === "upload" ? "กำลังอัปโหลด..." : "อัปโหลดรูปรีวิว"}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={uploadFiles}
              disabled={busy === "upload"}
              className="hidden"
            />
          </label>
        </div>

        {uploadProgress && (
          <div className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {uploadProgress}
          </div>
        )}

        {activeItems.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center">
            <ImageIcon className="mx-auto text-slate-300" size={48} />
            <h4 className="mt-4 font-semibold text-slate-800">ยังไม่มีภาพรีวิวในหมวดนี้</h4>
            <p className="mt-2 text-sm text-slate-500">กด “อัปโหลดรูปรีวิว” เพื่อเพิ่มภาพได้หลายรูปพร้อมกัน</p>
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibleItems.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                    <ReviewPreview item={item} />
                    <span
                      className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow ${
                        item.is_published ? "bg-emerald-600" : "bg-slate-700"
                      }`}
                    >
                      {item.is_published ? <Eye size={13} /> : <EyeOff size={13} />}
                      {item.is_published ? "กำลังแสดง" : "ซ่อนอยู่"}
                    </span>
                  </div>

                  <div className="space-y-3 p-4">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-slate-600">คำอธิบายรูป</span>
                      <input
                        value={item.alt_text}
                        onChange={(event) => update(item.id, { alt_text: event.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#b78b64]"
                        maxLength={250}
                        placeholder="เช่น รีวิวจากลูกค้า"
                      />
                    </label>

                    <div className="grid grid-cols-[1fr_auto] gap-3">
                      <label>
                        <span className="mb-1.5 block text-xs font-medium text-slate-600">ลำดับ</span>
                        <input
                          type="number"
                          value={item.sort_order}
                          onChange={(event) =>
                            update(item.id, { sort_order: Number(event.target.value) })
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#b78b64]"
                        />
                      </label>

                      <label className="flex items-end pb-1">
                        <span className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-xs text-slate-700">
                          <input
                            type="checkbox"
                            checked={item.is_published}
                            onChange={(event) =>
                              update(item.id, { is_published: event.target.checked })
                            }
                          />
                          แสดง
                        </span>
                      </label>
                    </div>

                    <p className="truncate text-xs text-slate-400" title={item.image_url}>
                      {item.image_url}
                    </p>

                    <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                      <button
                        type="button"
                        onClick={() => save(item)}
                        disabled={busy === `save-${item.id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a6784f] disabled:opacity-60"
                      >
                        {busy === `save-${item.id}` ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Save size={16} />
                        )}
                        บันทึก
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(item)}
                        disabled={busy === `delete-${item.id}`}
                        className="rounded-xl border border-red-200 p-2.5 text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                        aria-label="ลบรูปรีวิว"
                      >
                        {busy === `delete-${item.id}` ? (
                          <Loader2 size={17} className="animate-spin" />
                        ) : (
                          <Trash2 size={17} />
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {visibleLimit < activeItems.length && (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleLimit((current) => current + pageSize)}
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#a6784f] hover:text-[#8b603c]"
                >
                  แสดงเพิ่มอีก {Math.min(pageSize, activeItems.length - visibleLimit)} รูป
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
