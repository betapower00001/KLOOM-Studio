



"use client";

import Image from "next/image";
import { Phone } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full text-white py-35 px-6 md:px-12 bg-[#454456]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <p className="text-sm tracking-widest text-[#deb18a] uppercase mb-4">
            สัมผัสประสบการณ์แห่ง KLOOM Studio
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            ยินดีต้อนรับ <br /> KLOOM Studio 
          </h1>
          <p className="text-gray-300 mb-4 text-[22px]">
            ปกป้องชุดสุดรักของคุณด้วยถุงคลุมคุณภาพพรีเมียมจาก KLOOM Studio เราออกแบบถุงคลุมสำหรับชุดสูทและชุดราตรีโดยเฉพาะ เพื่อรักษาทรง ป้องกันฝุ่น และช่วยให้การพกพาเป็นเรื่องง่าย วัสดุแข็งแรง ระบายอากาศได้ดี ดีไซน์เรียบหรู เหมาะทั้งสำหรับการจัดเก็บและเดินทาง ให้ชุดของคุณพร้อมใส่เสมอในทุกโอกาส.
          </p>
          <p className="text-gray-300 mb-6 text-[19px]">
            215 เพชรเกษม 28 แยก 22 เขตภาษีเจริญ กรุงเทพมหานคร 10160.
          </p>

          {/* Button */}
          <button className="bg-[#deb18a] text-white px-6 py-3 font-normal text-[22px] tracking-wide hover:bg-[#876748] transition mb-6">
            อ่านเพิ่มเติม
          </button>

          {/* Phone */}
          <div className="flex items-center space-x-3 text-[#deb18a]">
            {/* ไอคอนโทรศัพท์ด้านซ้าย */}
            <Phone className="h-14 w-14" />

            {/* ข้อความและเบอร์เรียงบน-ล่าง */}
            <div className="flex flex-col">
              <span className="font-medium text-[15px] text-white" >For Reservation Call:</span>
              <span className="font-medium text-[25px]">088-642-4699</span>
            </div>
          </div>

        </div>

        {/* Right Images */}
        <div className="grid grid-cols-2 gap-6">
          {/* รูปซ้าย (สูงกว่า) */}
          <div className="relative w-full h-[550px] mt-[-80px]">
            <Image
              src="/Pic-sevice-1.jpg"
              alt="Show 1"
              fill
              className="object-cover rounded shadow-lg"
            />
          </div>

          {/* รูปขวา (ต่ำกว่า) */}
          <div className="relative w-full h-[550px] mb-[-80px]">
            <Image
              src="/Pic-sevice-2.jpg"
              alt="Show 2"
              fill
              className="object-cover rounded shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
