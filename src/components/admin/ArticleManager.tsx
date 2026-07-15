"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { adminFetch } from "@/lib/admin/api";
import MediaUpload from "./MediaUpload";

type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string;
  content_html: string;
  is_published: boolean;
  sort_order: number;
};

export default function ArticleManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setArticles(await adminFetch<Article[]>("/api/admin/articles"));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "โหลดบทความไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function update(id: string, patch: Partial<Article>) {
    setArticles((current) =>
      current.map((article) => (article.id === id ? { ...article, ...patch } : article)),
    );
  }

  async function run(key: string, action: () => Promise<void>) {
    setBusy(key);
    setMessage("");
    try {
      await action();
      setMessage("บันทึกข้อมูลเรียบร้อยแล้ว");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "เกิดข้อผิดพลาด");
    } finally {
      setBusy("");
    }
  }

  async function save(article: Article) {
    await run(`save-${article.id}`, async () => {
      await adminFetch("/api/admin/articles", {
        method: "PATCH",
        body: JSON.stringify({
          id: article.id,
          data: {
            slug: article.slug.trim(),
            title: article.title,
            excerpt: article.excerpt,
            cover_image_url: article.cover_image_url,
            content_html: article.content_html,
            is_published: article.is_published,
            sort_order: Number(article.sort_order),
          },
        }),
      });
    });
  }

  async function add() {
    await run("add", async () => {
      const slug = `article-${Date.now()}`;
      await adminFetch("/api/admin/articles", {
        method: "POST",
        body: JSON.stringify({
          slug,
          title: "บทความใหม่",
          excerpt: "",
          cover_image_url: "",
          content_html: "<p>เริ่มเขียนเนื้อหาที่นี่</p>",
          is_published: false,
          sort_order: articles.length + 1,
        }),
      });
      await load();
    });
  }

  async function remove(article: Article) {
    if (!window.confirm(`ลบบทความ “${article.title}” หรือไม่?`)) return;
    await run(`delete-${article.id}`, async () => {
      await adminFetch("/api/admin/articles", {
        method: "DELETE",
        body: JSON.stringify({ id: article.id }),
      });
      await load();
    });
  }

  if (loading) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-2xl bg-white">
        <Loader2 className="animate-spin text-[#a6784f]" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {message && <div className="sticky top-4 z-30 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">{message}</div>}

      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-2 rounded-xl bg-[#deb18a] px-4 py-3 font-semibold text-[#20202b] hover:bg-[#c89b72]"
      >
        {busy === "add" ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
        เพิ่มบทความ
      </button>

      {articles.map((article) => (
        <article key={article.id} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 md:p-7">
          <div className="grid gap-4 lg:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-medium text-slate-600">ชื่อบทความ</span>
              <input
                value={article.title}
                onChange={(event) => update(article.id, { title: event.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-lg font-semibold outline-none focus:border-[#b78b64]"
              />
            </label>
            <label>
              <span className="mb-2 block text-sm font-medium text-slate-600">Slug URL</span>
              <input
                value={article.slug}
                onChange={(event) => update(article.id, { slug: event.target.value.replace(/\s+/g, "-") })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm outline-none focus:border-[#b78b64]"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-slate-600">คำอธิบายสั้น</span>
            <textarea
              value={article.excerpt}
              onChange={(event) => update(article.id, { excerpt: event.target.value })}
              rows={2}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#b78b64]"
            />
          </label>

          <div className="mt-4">
            <span className="mb-2 block text-sm font-medium text-slate-600">ภาพหน้าปก</span>
            <MediaUpload
              value={article.cover_image_url}
              onChange={(url) => update(article.id, { cover_image_url: url })}
              folder="articles"
            />
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-slate-600">เนื้อหาบทความ (รองรับ HTML)</span>
            <textarea
              value={article.content_html}
              onChange={(event) => update(article.id, { content_html: event.target.value })}
              rows={16}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm leading-6 outline-none focus:border-[#b78b64]"
            />
          </label>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm">
              <input
                type="checkbox"
                checked={article.is_published}
                onChange={(event) => update(article.id, { is_published: event.target.checked })}
              />
              เผยแพร่บทความ
            </label>
            <label className="flex items-center gap-2 text-sm">
              ลำดับ
              <input
                type="number"
                value={article.sort_order}
                onChange={(event) => update(article.id, { sort_order: Number(event.target.value) })}
                className="w-20 rounded-lg border border-slate-200 px-3 py-2"
              />
            </label>
            <a
              href={`/blogs/${article.slug}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
            >
              ดูหน้าเว็บ
            </a>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() => save(article)}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#a6784f]"
              >
                {busy === `save-${article.id}` ? <Loader2 size={17} className="animate-spin" /> : <Save size={17} />}
                บันทึก
              </button>
              <button
                type="button"
                onClick={() => remove(article)}
                className="rounded-xl border border-red-200 p-2.5 text-red-600 hover:bg-red-50"
                aria-label="ลบบทความ"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
