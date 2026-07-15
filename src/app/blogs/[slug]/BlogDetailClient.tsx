"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { CmsArticle } from "@/lib/cms/types";

export default function BlogDetailClient({ article }: { article: CmsArticle }) {
  return (
    <section className="relative pt-[170px] pb-32 bg-gradient-to-br from-[#f9f7f3] to-[#e9e4dc] text-gray-900 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[url('/images/texture-luxury-bg.jpg')] bg-cover bg-center opacity-[0.08]"
        initial={{ backgroundPositionY: "0%" }}
        animate={{ backgroundPositionY: "100%" }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.img
          src={article.cover_image_url || "/placeholder.svg"}
          alt={article.title}
          className="w-full rounded-[32px] shadow-2xl mb-16 object-cover"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-4xl md:text-6xl leading-snug font-semibold mb-14 text-[#2b2b2b]"
        >
          {article.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.35 }}
          className="prose prose-lg md:prose-xl max-w-none prose-h2:!text-4xl prose-h2:!leading-tight prose-h2:!tracking-wide prose-h2:!mt-20 prose-h2:!mb-8 prose-h3:!text-2xl prose-h3:!leading-snug prose-h3:!mt-14 prose-h3:!mb-6 prose-p:!leading-loose prose-p:!tracking-normal prose-p:!my-6"
          dangerouslySetInnerHTML={{ __html: article.content_html }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="text-center mt-24"
        >
          <Link
            href="/blogs"
            className="inline-block px-12 py-4 text-lg bg-[#2b2b2b] text-white rounded-full hover:bg-[#b79c6d] transition-all duration-300"
          >
            ← กลับไปหน้าบทความ
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
