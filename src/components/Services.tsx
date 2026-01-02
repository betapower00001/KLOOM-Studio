"use client";

import Image from "next/image";
import { Scissors, Shirt, Ruler, Clock } from "lucide-react";

export default function ServiceSection() {
  const services = [
    {
      icon: <Shirt className="w-10 h-10 text-[#deb18a]" />,
      title: "ผ้าคุณภาพ",
      desc: "ใช้ผ้าคุณภาพสูง ทนทาน ระบายอากาศดี ป้องกันฝุ่นและความชื้น รักษาชุดให้ดูใหม่เสมอ.",
    },
    {
      icon: <Scissors className="w-10 h-10 text-[#deb18a]" />,
      title: "งานประณีตที่สุด",
      desc: "ใส่ใจทุกรายละเอียดในการตัดเย็บ เพื่อถุงคลุมที่สวยงาม แข็งแรง และปกป้องชุดสำคัญได้อย่างมั่นใจ.",
    },
    {
      icon: <Ruler className="w-10 h-10 text-[#deb18a]" />,
      title: "ดีไซน์ที่เป็นเอกลักษณ์",
      desc: "บริการสกรีนลายหรือโลโก้ เพิ่มความโดดเด่นและเอกลักษณ์เฉพาะให้กับธุรกิจของคุณ.",
    },
    {
      icon: <Clock className="w-10 h-10 text-[#deb18a]" />,
      title: "ส่งมอบตรงเวลา",
      desc: "ผลิตและจัดส่งตรงเวลา มั่นใจได้ในทุกการสั่งซื้อ.",
    },
  ];

  return (
    <section id="Services" className="w-full">
      {/* Top section */}
      <div className="grid md:grid-cols-2">
        {/* Left image */}
        <div className="relative min-h-[400px] md:min-h-full">
          <Image
            src="/image-8.jpg"
            alt="Tailor Man"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right content */}
        <div className="bg-[#454456] text-white flex flex-col justify-center px-8 md:px-12 py-12">
          <p className="uppercase tracking-widest text-2xl text-[#deb18a] mb-5">
            บริการของเรา
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
            อัตราค่าบล็อค และ สกรีน <br /> รับสั่ง ขั้นต่ำ 5 โหลขึ้นไป คละขนาดได้
          </h2>
          <p className="text-gray-300 mb-6 max-w-md text-[28px]">
            เพิ่มสกรีน 50-150.- /โหล (ขึ้นอยู่กับแบบ)
          </p>
          <p className="text-gray-300 mb-6 max-w-md text-[28px]">
            บล็อคสกรีน 600.- /บล็อค /ขนาด (ขนาดไม่เกิน A3)
          </p>
          <p className="text-gray-300 mb-6 max-w-md text-[28px]">
            ค่าสกรีน 1 จุด ต่อ 1 สี <br />
            บล็อคมีอายุใช้งาน 1 ปี <br />
          </p>
          {/* ปุ่มพอดีกับข้อความ */}
          <a
            href="https://line.me/ti/p/~@kloomstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start w-max border border-white px-6 py-4 text-[20px] font-semibold hover:bg-[#876748] hover:text-white transition-all duration-300"
          >
            ติดต่อสั่งทำ
          </a>
        </div>
      </div>
      {/* Bottom service icons */}
      <div className="bg-[#454456] text-white grid grid-cols-1 md:grid-cols-4 gap-8 px-8 md:px-12 py-16">
        {services.map((service, i) => (
          <div
            key={i}
            className="flex flex-col items-start gap-4 border-t md:border-t-0 md:border-l md:first:border-l-0 border-gray-600 pt-6 md:pt-0 md:pl-6"
          >
            {service.icon}
            <h3 className="text-[20px] font-semibold">{service.title}</h3>
            <p className="text-gray-300 text-[18px]">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
