import { BookOpen, Boxes, Images, Palette } from "lucide-react";
import { getSql } from "@/lib/neon/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const sql = getSql();
  let counts: Record<string, number> = {};

  try {
    const rows = (await sql`
      select
        (select count(*)::int from products) as products,
        (select count(*)::int from product_variants) as variants,
        (select count(*)::int from articles) as articles,
        (select count(*)::int from portfolio_items) as portfolio
    `) as any[];
    counts = (rows[0] ?? {}) as Record<string, number>;
  } catch (error) {
    console.error("โหลดจำนวนตัวอย่างผลงานไม่สำเร็จ", error);
    const rows = (await sql`
      select
        (select count(*)::int from products) as products,
        (select count(*)::int from product_variants) as variants,
        (select count(*)::int from articles) as articles
    `) as any[];
    counts = { ...((rows[0] ?? {}) as Record<string, number>), portfolio: 0 };
  }

  const cards = [
    { label: "รายการสินค้า", value: Number(counts.products ?? 0), icon: Boxes },
    { label: "สีและราคา", value: Number(counts.variants ?? 0), icon: Palette },
    { label: "บทความ", value: Number(counts.articles ?? 0), icon: BookOpen },
    { label: "ตัวอย่างผลงาน", value: Number(counts.portfolio ?? 0), icon: Images },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#a6784f]">Dashboard</p>
        <h1 className="mt-2 text-3xl font-bold">ภาพรวมเว็บไซต์</h1>
        <p className="mt-2 text-slate-600">แก้ไขข้อมูลแล้วหน้าเว็บไซต์จะดึงข้อมูลล่าสุดโดยอัตโนมัติ</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <p className="mt-2 text-4xl font-bold text-slate-900">{card.value}</p>
                </div>
                <div className="rounded-2xl bg-[#deb18a]/20 p-4 text-[#9a6f4b]">
                  <Icon size={26} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl bg-[#20202b] p-7 text-white shadow-lg">
        <h2 className="text-xl font-semibold">ระบบที่ติดตั้งแล้ว</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-300">
          จัดการสินค้า ขนาด สี ราคา รูปภาพ บทความ ตัวอย่างผลงาน และข้อมูลติดต่อ พร้อมระบบล็อกอิน โดยเก็บข้อมูลใน Neon และรูปภาพใน Vercel Blob
        </p>
      </div>
    </div>
  );
}
