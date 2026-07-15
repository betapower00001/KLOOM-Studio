"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ExternalLink, ImageIcon, Loader2, Save } from "lucide-react";
import { adminFetch } from "@/lib/admin/api";
import MediaUpload from "./MediaUpload";
import ReviewGalleryManager from "./ReviewGalleryManager";

type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  alt_text: string;
  review_url: string;
  is_published: boolean;
  sort_order: number;
};

const fixedCategories = [1, 2, 3] as const;

function categoryFromItem(item: PortfolioItem) {
  const match = String(item.review_url || "").match(/\/review\/(1|2|3)(?:\/|$|\?)/i);
  if (match) return Number(match[1]);
  if (fixedCategories.includes(Number(item.sort_order) as 1 | 2 | 3)) {
    return Number(item.sort_order);
  }
  return null;
}

function PortfolioPreview({ item }: { item: PortfolioItem }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [item.image_url]);

  if (!item.image_url || failed) {
    return (
      <div className="flex h-full items-center justify-center text-slate-400">
        <div className="text-center">
          <ImageIcon className="mx-auto" size={42} />
          <p className="mt-2 text-sm">
            {item.image_url ? "ไม่สามารถแสดงรูปนี้ได้" : "ยังไม่ได้อัปโหลดรูป"}
          </p>
        </div>
      </div>
    );
  }

  return (
    // รองรับทั้งรูปเดิมใน public และ URL จาก Vercel Blob
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.image_url}
      alt={item.title || "ตัวอย่างผลงาน"}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}

export default function PortfolioManager() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setMessage("");
    try {
      setItems(await adminFetch<PortfolioItem[]>("/api/admin/portfolio"));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "โหลดตัวอย่างผลงานไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const fixedItems = useMemo(() => {
    return fixedCategories
      .map((categoryId) =>
        items.find((item) => categoryFromItem(item) === categoryId),
      )
      .filter((item): item is PortfolioItem => Boolean(item));
  }, [items]);

  function update(id: string, patch: Partial<PortfolioItem>) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  async function save(item: PortfolioItem) {
    const categoryId = categoryFromItem(item);
    if (!categoryId) {
      setMessage("ไม่พบหมายเลขหมวดของผลงานนี้");
      return;
    }

    setBusy(`save-${item.id}`);
    setMessage("");
    try {
      await adminFetch("/api/admin/portfolio", {
        method: "PATCH",
        body: JSON.stringify({
          id: item.id,
          data: {
            title: item.title,
            description: item.description,
            image_url: item.image_url,
            review_url: `/review/${categoryId}`,
            sort_order: categoryId,
          },
        }),
      });
      setMessage(`บันทึกหมวด ${categoryId} เรียบร้อยแล้ว`);
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "บันทึกข้อมูลไม่สำเร็จ");
    } finally {
      setBusy("");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-2xl bg-white">
        <Loader2 className="animate-spin text-[#a6784f]" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {message && (
        <div className="rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
          {message}
        </div>
      )}

      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900">
        ตัวอย่างผลงานถูกล็อกไว้เพียง 3 หมวดตามหน้าเว็บไซต์ แก้ได้เฉพาะ
        <span className="font-semibold"> รูปปก ชื่อ และคำอธิบาย </span>
        ส่วนภาพรีวิวภายในแต่ละหมวดจัดการได้จากหัวข้อด้านล่าง
      </div>

      {fixedItems.length !== 3 && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          ระบบพบข้อมูลตัวอย่างผลงานไม่ครบ 3 หมวด กรุณารีเฟรชหน้าอีกครั้ง หากยังไม่ครบให้รันไฟล์อัปเดตฐานข้อมูลของระบบภาพรีวิว
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        {fixedItems.map((item) => {
          const categoryId = categoryFromItem(item) ?? item.sort_order;
          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/70"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <PortfolioPreview item={item} />
                <span className="absolute left-3 top-3 rounded-full bg-slate-950/85 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur">
                  หมวด {categoryId}
                </span>
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-600">รูปปกหมวด</span>
                  <MediaUpload
                    value={item.image_url}
                    onChange={(url) => update(item.id, { image_url: url })}
                    folder="portfolio"
                  />
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-600">ชื่อหมวด</span>
                  <input
                    value={item.title}
                    onChange={(event) => update(item.id, { title: event.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-900 outline-none focus:border-[#b78b64]"
                    maxLength={200}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-600">คำอธิบาย</span>
                  <textarea
                    value={item.description}
                    onChange={(event) => update(item.id, { description: event.target.value })}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 leading-6 text-slate-900 outline-none focus:border-[#b78b64]"
                    maxLength={500}
                  />
                </label>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => save(item)}
                    disabled={busy === `save-${item.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#a6784f] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {busy === `save-${item.id}` ? (
                      <Loader2 size={17} className="animate-spin" />
                    ) : (
                      <Save size={17} />
                    )}
                    บันทึก
                  </button>

                  <a
                    href={`/review/${categoryId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#a6784f] px-4 py-3 text-sm font-semibold text-[#8b603c] transition hover:bg-[#a6784f] hover:text-white"
                  >
                    <ExternalLink size={17} />
                    ดูหน้ารีวิว
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <ReviewGalleryManager />
    </div>
  );
}
