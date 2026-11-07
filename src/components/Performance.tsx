"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


type PortfolioItem = {
  category_id: number;
  title: string;
  description: string;
  image_url: string;
  review_url: string;
};


function PortfolioCover({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [src]);
  if (!src || failed) return (
    <div className="flex h-56 items-center justify-center bg-slate-100 px-4 text-center text-sm text-slate-500">
      ยังไม่มีรูปปกที่แสดงได้ — กรุณาอัปโหลดรูปในหลังบ้าน
    </div>
  );
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={title} loading="lazy" onError={() => setFailed(true)} className="w-full h-56 object-cover cursor-pointer transition-transform duration-300 hover:scale-105" />;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loadError, setLoadError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    const controllers = new Set<AbortController>();
    async function reload() {
      const controller = new AbortController();
      controllers.add(controller);
      try {
        const response = await fetch("/api/cms/portfolio", { cache: "no-store", signal: controller.signal });
        if (!response.ok) {
          const problem = await response.json().catch(() => ({}));
          throw new Error(typeof problem.error === "string" ? problem.error : `API ตัวอย่างผลงานตอบ HTTP ${response.status}`);
        }
        const data: unknown = await response.json();
        if (!Array.isArray(data)) throw new Error("ข้อมูลจาก API ไม่ใช่รายการผลงาน");
        if (active) { setProjects(data as PortfolioItem[]); setLoadError(""); setLoaded(true); }
      } catch (error) {
        if (active && !controller.signal.aborted) {
          setLoadError(error instanceof Error ? error.message : "โหลดข้อมูลจาก CMS ไม่สำเร็จ");
          setLoaded(true);
        }
      } finally { controllers.delete(controller); }
    }
    void reload();
    const refresh = () => { if (document.visibilityState === "visible") void reload(); };
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      active = false;
      controllers.forEach((controller) => controller.abort());
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  return (
    <section className="py-20 bg-[#f9f9f9]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#454456]">
          ตัวอย่างผลงานของเรา
        </h2>

        {loadError && (
          <p role="alert" className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-800">
            ไม่สามารถโหลดตัวอย่างผลงานจากระบบหลังบ้านได้: {loadError} กรุณาตรวจสอบ DATABASE_URL และ API /api/cms/portfolio
          </p>
        )}
        {!loaded && <p className="mb-6 text-center text-gray-500">กำลังโหลดผลงาน…</p>}
        {loaded && !loadError && projects.length === 0 && <p className="mb-6 text-center text-gray-500">ยังไม่มีผลงานที่เผยแพร่</p>}
        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((item) => (
            <div
              key={item.category_id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <Link href={item.review_url} className="block">
                <PortfolioCover src={item.image_url} title={item.title} />
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
