"use client";

import Image from "next/image";

export default function Exaddon() {
  const addons = [
    {
      img: "/AddonEx-1.png",
      title: "เพิ่มหมวกด้านหน้า",
      desc: "ดีไซน์เรียบหรู เพิ่มความสะดวกและเสริมความพรีเมียมให้กับสินค้า",
    },
    {
      img: "/AddonEx-2.jpg",
      title: "เพิ่มหูหิ้ว บน-ล่าง",
      desc: "รายละเอียดที่สะท้อนถึงความประณีตและความใส่ใจในทุกขั้นตอน",
    },
    {
      img: "/AddonEx-3.jpg",
      title: "เพิ่มกระดุม",
      desc: "ปรับแต่งเฉพาะตัวให้ตรงกับสไตล์ของคุณอย่างเหนือระดับ",
    },
  ];

  return (
    <section id="Exaddon" className="py-24 bg-[#454456] text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-[#deb18a] tracking-wide">
          ฟังก์ชันเสริมที่เลือกได้
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {addons.map((item, index) => (
            <div
              key={index}
              className="group bg-[#56556a]/30 border border-[#deb18a]/20 rounded-2xl overflow-hidden
                         shadow-md hover:shadow-[0_0_25px_rgba(222,177,138,0.3)]
                         transition-all duration-500 backdrop-blur-sm"
            >
              <div className="overflow-hidden relative h-64">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3 text-[#deb18a] group-hover:text-[#f1cfa3] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[#deb18a]/60 text-sm mt-12 tracking-widest uppercase">
          Elegance • Craftsmanship • Personalization
        </p>
      </div>
    </section>
  );
}
