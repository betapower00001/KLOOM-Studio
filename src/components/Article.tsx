"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import fallbackArticles from "@/data/fallback-articles.json";
import type { CmsArticle } from "@/lib/cms/types";

export default function Article() {
  const [article, setArticle] = useState<CmsArticle | null>(
    (fallbackArticles as CmsArticle[])[0] ?? null,
  );

  useEffect(() => {
    fetch("/api/cms/articles", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (Array.isArray(data)) setArticle(data[0] ?? null);
      })
      .catch(() => undefined);
  }, []);

  if (!article) return null;

  return (
    <section className="bg-gradient-to-br from-[#f9f7f3] to-[#e9e4dc] py-24 text-gray-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 px-6 md:flex-row">
        <div className="relative md:w-1/2">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/40 to-transparent" />
          <Image
            src={article.cover_image_url || "/placeholder.svg"}
            alt={article.title}
            width={800}
            height={600}
            className="w-full rounded-3xl object-cover shadow-2xl"
          />
        </div>

        <div className="md:w-1/2">
          <h2 className="mb-6 text-center text-4xl font-semibold tracking-wide text-[#2b2b2b] md:text-left">
            {article.title}
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-gray-700">
            {article.excerpt}
          </p>
          <div className="text-center md:text-left">
            <Link
              href={`/blogs/${article.slug}`}
              className="inline-block rounded-full bg-[#2b2b2b] px-8 py-3 text-white shadow-md transition-all duration-300 hover:bg-[#b79c6d]"
            >
              อ่านเพิ่มเติม
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
