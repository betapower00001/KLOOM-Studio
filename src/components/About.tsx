"use client";

import Image from "next/image";
import { ArrowUpRight, MapPin, Phone, Sparkles } from "lucide-react";
import { Cormorant_Garamond, Noto_Sans_Thai } from "next/font/google";

// โหลดฟอนต์ผ่าน Next.js เพื่อให้สระ/วรรณยุกต์ภาษาไทยแสดงผลถูกต้อง
const thaiFont = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const classicFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// รูปภาพอยู่ที่ public/images/ — ไม่ต้อง import ด้วย path แบบ relative
const SUIT_IMAGE = "/images/kloom-hero-suit-gown.webp";
const COLLECTION_IMAGE = "/images/kloom-hero-collection.webp";
const LINE_URL = "https://line.me/ti/p/~@kloomstudio";

export default function HeroSection() {
  return (
    <section
      id="about"
      aria-labelledby="hero-title"
      className={`${thaiFont.className} relative isolate w-full overflow-hidden bg-[#30251e] text-[#fff7e9]`}
    >
      {/* พื้นหลัง Classic Vintage — ใช้ CSS ไม่ฝังตัวอักษรลงบนภาพ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_18%,rgba(185,135,82,0.18),transparent_39%),radial-gradient(ellipse_at_95%_90%,rgba(161,110,58,0.13),transparent_37%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 inset-y-5 border border-[#d5b685]/15 sm:inset-x-8 sm:inset-y-8"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-[-250px] h-[540px] w-[540px] rounded-full border border-[#d7ba8a]/10"
      />

      <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-12 px-7 py-16 sm:px-12 sm:py-20 lg:min-h-[800px] lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-8 lg:px-16 lg:py-24 2xl:px-24">
        {/* LEFT: ข้อความ HTML แก้ไขและ SEO-friendly */}
        <div className="relative z-10 max-w-[750px]">
          <div className="mb-7 flex flex-wrap items-center gap-3 text-[#dfbe8e]">
            <span className="h-px w-10 bg-[#c7a16f]" aria-hidden="true" />
            <span className="text-[14px] font-semibold leading-7 tracking-normal sm:text-[16px]">
              สัมผัสประสบการณ์แห่ง KLOOM STUDIO
            </span>
          </div>

          <h1
            id="hero-title"
            className="text-[40px] font-semibold leading-[1.45] tracking-normal text-[#fef7eb] sm:text-[49px] lg:text-[54px] xl:text-[60px]"
          >
            ยินดีต้อนรับสู่
            <span
              className={`${classicFont.className} mt-1 block text-[60px] font-semibold leading-[1.05] tracking-[0.015em] text-[#e9c395] sm:text-[75px] lg:text-[85px] xl:text-[100px]`}
            >
              KLOOM Studio
            </span>
          </h1>

          <div className="my-7 flex items-center gap-3" aria-hidden="true">
            <span className="h-px w-24 bg-[#a88050]" />
            <Sparkles className="h-5 w-5 text-[#d7b17b]" strokeWidth={1.4} />
            <span className="h-px w-12 bg-[#a88050]" />
          </div>

          <p className="max-w-[650px] text-[19px] font-normal leading-[1.95] text-[#efe5da] sm:text-[21px] lg:text-[22px]">
            ยกระดับการดูแลชุดสำคัญ ด้วยถุงคลุมชุดคุณภาพพรีเมียมจาก
            KLOOM STUDIO สำหรับชุดสูท ชุดไทย และชุดราตรี
            ออกแบบอย่างประณีต ช่วยป้องกันฝุ่น รักษาความเรียบร้อย
            และเพิ่มภาพลักษณ์ที่โดดเด่นให้กับร้านและแบรนด์ของคุณ
          </p>

          <div className="mt-8 flex max-w-[630px] items-start gap-4 border-l-2 border-[#c8a171] pl-5">
            <MapPin
              className="mt-1 h-6 w-6 shrink-0 text-[#dfba85]"
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <p className="text-[17px] leading-[1.85] text-[#e7d7c4] sm:text-[19px]">
              215 เพชรเกษม 28 แยก 22 เขตภาษีเจริญ กรุงเทพมหานคร 10160
            </p>
          </div>

          <div className="mt-9 flex flex-col items-start gap-7 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[60px] items-center justify-center gap-3 rounded-sm border border-[#f1d6ac] bg-[#d7b184] px-8 py-3 text-[20px] font-semibold leading-8 text-[#32251b] shadow-[0_12px_28px_rgba(0,0,0,0.15)] transition duration-300 hover:bg-[#efd0a0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              ติดต่อปรึกษาทาง LINE
              <ArrowUpRight
                className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            <a
              href="tel:0886424699"
              aria-label="โทร 088-642-4699"
              className="group inline-flex items-center gap-3 text-[#e5c397] transition-colors hover:text-white"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c29c69]/65">
                <Phone className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[14px] tracking-normal text-[#d8c7b1]">
                  สอบถามรายละเอียด โทร.
                </span>
                <span className="text-[25px] font-semibold leading-snug tracking-normal sm:text-[27px]">
                  088-642-4699
                </span>
              </span>
            </a>
          </div>

          <p className={`${classicFont.className} mt-11 text-[21px] italic tracking-[0.06em] text-[#d1ad7d]/90`}>
            Crafted to protect what you love.
          </p>
        </div>

        {/* RIGHT: ภาพสินค้า 2 รูป แนว Classic Editorial — ไม่ยืดสัดส่วนภาพ */}
        <div className="relative mx-auto h-[540px] w-full max-w-[670px] sm:h-[680px] lg:h-[720px]">
          <div
            aria-hidden="true"
            className="absolute left-[4%] top-[1%] h-[88%] w-[72%] rotate-[-3deg] border border-[#e4bd84]/60"
          />

          <figure className="absolute left-[1%] top-[4%] h-[84%] w-[69%] overflow-hidden rounded-t-[180px] rounded-b-[3px] border-[5px] border-[#f4e4cf] bg-[#cbb5a0] shadow-[0_24px_65px_rgba(0,0,0,0.40)]">
            <Image
              src={SUIT_IMAGE}
              alt="ถุงคลุมชุดหน้าใสโชว์สูทกรมท่าและชุดราตรีในสตูดิโอวินเทจ"
              fill
              priority
              sizes="(max-width: 640px) 65vw, (max-width: 1024px) 55vw, 31vw"
              className="object-cover object-[48%_center]"
            />
          </figure>

          <figure className="absolute bottom-[5%] right-0 h-[61%] w-[47%] overflow-hidden rounded-t-[140px] rounded-b-[3px] border-[5px] border-[#f4e4cf] bg-[#b9a18a] shadow-[0_22px_55px_rgba(0,0,0,0.42)]">
            <Image
              src={COLLECTION_IMAGE}
              alt="ถุงคลุมชุดหลากหลายสีจัดแสดงบนราวในตู้ไม้สไตล์วินเทจ"
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 36vw, 22vw"
              className="object-cover object-center"
            />
          </figure>

          <div
            aria-hidden="true"
            className="absolute bottom-[2%] left-[1%] h-16 w-16 rounded-full border border-[#c79d68]/50 sm:h-24 sm:w-24"
          />
          <div
            aria-hidden="true"
            className="absolute right-[1%] top-[7%] h-px w-16 bg-[#c79d68] sm:w-24"
          />
        </div>
      </div>

      {/* Thin vintage footer detail */}
      <div aria-hidden="true" className="h-[5px] w-full bg-[linear-gradient(90deg,#60472f,#d8b98d_32%,#9f784e_66%,#60472f)]" />
    </section>
  );
}
