"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { adminFetch } from "@/lib/admin/api";
import MediaUpload from "./MediaUpload";

type ContactSettings = {
  phone: string;
  line: string;
  email: string;
  address: string;
};

type HeroSettings = {
  title: string;
  subtitle: string;
  image_url: string;
  button_text: string;
};

type SettingRow = { key: string; value: ContactSettings | HeroSettings };

const defaultContact: ContactSettings = {
  phone: "088-642-4699",
  line: "@kloomstudio",
  email: "gowgalz@gmail.com",
  address: "215 เพชรเกษม 28 แยก 22 เขตภาษีเจริญ กรุงเทพมหานคร 10160",
};

const defaultHero: HeroSettings = {
  title: "เพราะสไตล์ของคุณ…ไม่เหมือนใคร",
  subtitle: "เราพร้อมออกแบบลุคในแบบที่เป็นตัวคุณ",
  image_url: "/image-1.jpg",
  button_text: "Discover More",
};

export default function SettingsManager() {
  const [contact, setContact] = useState<ContactSettings>(defaultContact);
  const [hero, setHero] = useState<HeroSettings>(defaultHero);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const rows = await adminFetch<SettingRow[]>("/api/admin/settings");
        for (const row of rows) {
          const value = typeof row.value === "string" ? JSON.parse(row.value) : row.value;
          if (row.key === "contact") setContact({ ...defaultContact, ...(value as ContactSettings) });
          if (row.key === "hero") setHero({ ...defaultHero, ...(value as HeroSettings) });
        }
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "โหลดข้อมูลไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  async function save() {
    setBusy(true);
    setMessage("");
    try {
      await adminFetch("/api/admin/settings", {
        method: "PUT",
        body: JSON.stringify({ contact, hero }),
      });
      setMessage("บันทึกข้อมูลเว็บไซต์เรียบร้อยแล้ว");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "บันทึกไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <div className="flex min-h-72 items-center justify-center rounded-2xl bg-white"><Loader2 className="animate-spin text-[#a6784f]" size={32} /></div>;
  }

  return (
    <div className="space-y-6">
      {message && <div className="sticky top-4 z-30 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">{message}</div>}

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 md:p-8">
        <h2 className="text-xl font-bold">ส่วนหน้าหลัก (Hero)</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-600">หัวข้อใหญ่</span>
            <input value={hero.title} onChange={(event) => setHero({ ...hero, title: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-600">ข้อความรอง</span>
            <input value={hero.subtitle} onChange={(event) => setHero({ ...hero, subtitle: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-600">ข้อความบนปุ่ม</span>
            <input value={hero.button_text} onChange={(event) => setHero({ ...hero, button_text: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
          </label>
          <div>
            <span className="mb-2 block text-sm font-medium text-slate-600">ภาพพื้นหลัง</span>
            <MediaUpload value={hero.image_url} onChange={(url) => setHero({ ...hero, image_url: url })} folder="site" />
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 md:p-8">
        <h2 className="text-xl font-bold">ข้อมูลติดต่อ</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-600">เบอร์โทรศัพท์</span>
            <input value={contact.phone} onChange={(event) => setContact({ ...contact, phone: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-600">LINE</span>
            <input value={contact.line} onChange={(event) => setContact({ ...contact, line: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-600">อีเมล</span>
            <input type="email" value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-600">ที่อยู่</span>
            <textarea value={contact.address} onChange={(event) => setContact({ ...contact, address: event.target.value })} rows={3} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
          </label>
        </div>
      </section>

      <button type="button" onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-[#a6784f] disabled:opacity-60">
        {busy ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} บันทึกข้อมูลทั้งหมด
      </button>
    </div>
  );
}
