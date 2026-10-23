"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type PortfolioItem = {
  category_id: number;
  title: string;
  description: string;
  image_url: string;
  review_url: string;
};

const initialProjects: PortfolioItem[] = [
  {
    category_id: 1,
    title: "เรียบหรู",
    description: "ออกแบบและพัฒนางานถุงคลุมชุดที่ดูดี เหมาะกับภาพลักษณ์ของร้าน",
    image_url: "/EX-1.jpg",
    review_url: "/review/1",
  },
  {
    category_id: 2,
    title: "นำซีนแฟชั่น",
    description: "ดีไซน์งานให้มีเอกลักษณ์ สวยทันสมัย และช่วยเสริมภาพลักษณ์แบรนด์",
    image_url: "/EX-2.jpg",
    review_url: "/review/2",
  },
  {
    category_id: 3,
    title: "ดีไซน์เป็นเอกลักษณ์",
    description: "รวบรวมผลงานจริงและภาพรีวิวจากลูกค้าในแต่ละรูปแบบงาน",
    image_url: "/EX-3.jpg",
    review_url: "/review/3",
  },
];

export default function Portfolio() {
  const [projects, setProjects] = useState<PortfolioItem[]>(initialProjects);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/cms/portfolio", { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`โหลดผลงานไม่สำเร็จ (HTTP ${response.status})`);
        return response.json();
      })
      .then((data: unknown) => {
        if (Array.isArray(data)) setProjects(data as PortfolioItem[]);
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) console.error("Portfolio CMS:", error);
      });
    return () => controller.abort();
  }, []);

  return (
    <section className="py-20 bg-[#f9f9f9]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#454456]">
          ตัวอย่างผลงานของเรา
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((item) => (
            <div
              key={item.category_id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <Link href={item.review_url} className="block">
                <Image
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.title}
                  width={600}
                  height={400}
                  unoptimized
                  className="w-full h-56 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-[#454456] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-6">{item.description}</p>
                <Link
                  href={item.review_url}
                  className="inline-block px-6 py-2 rounded-full border border-[#454456] text-[#454456] hover:bg-[#454456] hover:text-white transition-all duration-300 text-sm font-medium"
                >
                  ดูรีวิว
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
