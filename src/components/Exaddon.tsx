'use client';

import { useEffect, useState } from 'react';
import type { FeatureAddon } from '@/lib/cms/addons';

export default function Exaddon() {
  const [addons, setAddons] = useState<FeatureAddon[]>([]);
  const [loadError, setLoadError] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let active = true;
    const controllers = new Set<AbortController>();
    let inFlight = false;
    async function reload() {
      if (inFlight || !active) return;
      inFlight = true;
      const controller = new AbortController();
      controllers.add(controller);
      try {
        const response = await fetch(`/api/cms/feature-addons?t=${Date.now()}`, { cache: 'no-store', signal: controller.signal });
        if (!response.ok) {
          const problem = await response.json().catch(() => ({}));
          throw new Error(typeof problem.error === 'string' ? problem.error : `API ฟังก์ชันเสริมตอบ HTTP ${response.status}`);
        }
        const data: unknown = await response.json();
        if (!Array.isArray(data)) throw new Error('ข้อมูลจาก API ไม่ใช่รายการฟังก์ชันเสริม');
        if (active) { setAddons(data as FeatureAddon[]); setLoadError(''); setLoaded(true); }
      } catch (error) {
        if (active && !controller.signal.aborted) {
          setLoadError(error instanceof Error ? error.message : 'โหลดฟังก์ชันเสริมไม่สำเร็จ');
          setLoaded(true);
        }
      } finally { controllers.delete(controller); inFlight = false; }
    }
    void reload();
    const refresh = () => { if (document.visibilityState === 'visible') void reload(); };
    const poll = window.setInterval(refresh, 5000);
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      active = false;
      window.clearInterval(poll);
      controllers.forEach((controller) => controller.abort());
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);

  if (addons.length === 0 && loaded && !loadError) return null;
  return <section id="Exaddon" className="py-24 bg-[#454456] text-white">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-[#deb18a] tracking-wide">ฟังก์ชันเสริมที่เลือกได้</h2>
      {loadError && <p role="alert" className="mb-8 rounded-xl bg-red-50 p-4 text-red-800">ไม่สามารถโหลดฟังก์ชันเสริมจาก CMS: {loadError} กรุณาตรวจสอบ API /api/cms/feature-addons</p>}
      {!loaded && <p className="mb-8 text-gray-300">กำลังโหลดฟังก์ชันเสริม…</p>}
      <div className="grid md:grid-cols-3 gap-10">
        {addons.map((item) => <div key={item.id} className="group bg-[#56556a]/30 border border-[#deb18a]/20 rounded-2xl overflow-hidden shadow-md hover:shadow-[0_0_25px_rgba(222,177,138,0.3)] transition-all duration-500 backdrop-blur-sm">
          <div className="overflow-hidden relative h-64 bg-[#56556a]">
            {item.image_url ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={item.image_url} alt={item.title} className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500" /> : <div className="flex h-full items-center justify-center text-gray-300">ยังไม่มีรูปภาพ</div>}
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-semibold mb-3 text-[#deb18a] group-hover:text-[#f1cfa3] transition-colors">{item.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
          </div>
        </div>)}
      </div>
      <p className="text-[#deb18a]/60 text-sm mt-12 tracking-widest uppercase">Elegance • Craftsmanship • Personalization</p>
    </div>
  </section>;
}
