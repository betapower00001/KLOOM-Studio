'use client';

import { useEffect, useState } from 'react';
import { defaultFeatureAddons, type FeatureAddon } from '@/lib/cms/addons';

export default function Exaddon() {
  const [addons, setAddons] = useState<FeatureAddon[]>(defaultFeatureAddons);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/cms/feature-addons', { cache: 'no-store', signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error('โหลดฟังก์ชันเสริมไม่สำเร็จ'); return response.json(); })
      .then((data: unknown) => { if (Array.isArray(data)) setAddons(data as FeatureAddon[]); })
      .catch((error) => { if (!controller.signal.aborted) console.error('Feature addons:', error); });
    return () => controller.abort();
  }, []);

  if (addons.length === 0) return null;
  return <section id="Exaddon" className="py-24 bg-[#454456] text-white">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-[#deb18a] tracking-wide">ฟังก์ชันเสริมที่เลือกได้</h2>
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
