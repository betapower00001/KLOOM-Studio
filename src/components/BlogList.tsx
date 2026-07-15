"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import fallbackArticles from "@/data/fallback-articles.json";
import type { CmsArticle } from "@/lib/cms/types";

export default function BlogList() {
  const [articles, setArticles] = useState<CmsArticle[]>(
    fallbackArticles as CmsArticle[],
  );

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/cms/articles", {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (Array.isArray(data)) setArticles(data);
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  return (
    <section className="relative pt-[150px] pb-24 bg-gradient-to-br from-[#f9f7f3] to-[#ebe6dd] text-gray-900 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[url('/images/texture-luxury-bg.jpg')] bg-cover bg-center opacity-10"
        initial={{ backgroundPositionY: "0%" }}
        animate={{ backgroundPositionY: "100%" }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-semibold text-center mb-16 tracking-wide text-[#2b2b2b]"
        >
          บทความจากห้องเสื้อและบรรจุภัณฑ์แฟชั่น
        </motion.h1>

        {articles.length === 0 ? (
          <p className="rounded-3xl bg-white p-10 text-center text-gray-500 shadow-xl">
            ยังไม่มีบทความที่เผยแพร่
          </p>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12">
            {articles.map((article, index) => (
              <motion.div
                key={article.id ?? article.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/blogs/${article.slug}`}
                  className="group block bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                  <motion.div whileHover={{ scale: 1.05 }} className="overflow-hidden">
                    <Image
                      src={article.cover_image_url || "/placeholder.svg"}
                      alt={article.title}
                      width={800}
                      height={600}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>

                  <div className="p-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#2b2b2b] group-hover:text-[#b79c6d] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{article.excerpt}</p>
                    <span className="text-[#b79c6d] font-medium">อ่านเพิ่มเติม →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
