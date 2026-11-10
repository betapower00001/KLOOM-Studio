"use client";

import Image from "next/image";
import { Noto_Sans_Thai } from "next/font/google";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Ruler,
  Scissors,
  Shirt,
  Sparkles,
} from "lucide-react";

// รูปภาพทั้งหมดอยู่ที่ /public/images/ (คัดลอกโฟลเดอร์ public ไปไว้ที่ root ของ Next.js)
// ใช้ฟอนต์ที่รองรับสระ/วรรณยุกต์ภาษาไทยโดยตรง
// โหลดผ่าน Next.js ไม่ต้องฝังตัวอักษรลงในภาพ
const thaiFont = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const HERO_IMAGE = "/images/kloom-screen-hero.jpg";
const WORKSHOP_IMAGE = "/images/kloom-workshop.webp";
const PRODUCT_DETAIL_IMAGE = "/images/kloom-wardrobe.jpg";
const LINE_URL = "https://line.me/ti/p/~@kloomstudio";

const priceTiers = [
  {
    title: "เรทที่ 1",
    minOrder: "3 โหล",
    screenPrice: "20",
    screenUnit: "บาท / จุดสกรีน",
    blockPrice: "600",
    blockUnit: "บาท / บล็อก",
    blockNote: "เก็บบล็อก 1 ปี",
  },
  {
    title: "เรทที่ 2",
    minOrder: "5 โหลขึ้นไป",
    screenPrice: "50–150",
    screenUnit: "บาท / โหล (ขึ้นอยู่กับแบบ)",
    blockPrice: "600",
    blockUnit: "บาท / บล็อก",
    blockNote: "เก็บบล็อก 1 ปี",
  },
];

const services = [
  {
    Icon: Shirt,
    title: "ผ้าคุณภาพ",
    desc: "ถุงคลุมชุดหลากหลายวัสดุและสีสัน เพื่อการจัดเก็บชุดอย่างสวยงาม",
  },
  {
    Icon: Scissors,
    title: "งานประณีต",
    desc: "ใส่ใจรายละเอียดงานผลิตและการสกรีน เพื่อภาพลักษณ์ที่ดีของแบรนด์",
  },
  {
    Icon: Ruler,
    title: "คละขนาดได้",
    desc: "สามารถคละขนาดถุงคลุมชุดได้ตามเงื่อนไขการสั่งผลิต",
  },
  {
    Icon: Clock3,
    title: "ดูแลทุกคำสั่งซื้อ",
    desc: "ให้คำแนะนำเรื่องขนาด วัสดุ และงานสกรีนก่อนเริ่มผลิต",
  },
];

export default function ServiceSection() {
  return (
    <section id="Services" className={`${thaiFont.className} w-full overflow-hidden bg-[#f8f2e9] text-[#392d28] tracking-normal antialiased`}>
      {/* HERO — ภาพเต็มหน้าจอ + ข้อความที่แก้ไขในโค้ดได้ */}
      <div className="relative isolate w-full overflow-hidden bg-[#f2e7d9]">
        {/* Desktop: ภาพสินค้าเต็มความกว้าง, จัดสินค้าไว้ซ้ายและราคาไว้ขวา */}
        <Image
          src={HERO_IMAGE}
          alt="ตัวอย่างถุงคลุมชุด KLOOM STUDIO สีกรมท่าและสีเบจ"
          fill
          sizes="100vw"
          priority
          className="pointer-events-none hidden select-none object-cover object-center lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block bg-[linear-gradient(90deg,transparent_0%,transparent_43%,rgba(250,245,237,0.18)_50%,rgba(250,245,237,0.85)_63%,#faf5ed_81%)]"
        />

        {/* Mobile: แสดงภาพด้านบนก่อน เพื่อไม่ให้ราคาอ่านยาก */}
        <div className="relative h-[330px] w-full sm:h-[420px] lg:hidden">
          <Image
            src={HERO_IMAGE}
            alt="ถุงคลุมชุดหน้าใสและสปันบอนด์ สำหรับงานสกรีนโลโก้"
            fill
            sizes="(max-width: 640px) 100vw, 100vw"
            priority
            className="object-cover object-left"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#f8f2e9] to-transparent" />
        </div>

        <div className="relative mx-auto grid w-full max-w-[1800px] grid-cols-1 lg:min-h-[930px] lg:grid-cols-[minmax(0,1fr)_minmax(0,730px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,820px)]">
          <div className="hidden lg:block" aria-hidden="true" />

          <div className="flex min-w-0 flex-col justify-center px-5 pb-14 pt-6 sm:px-9 lg:px-8 lg:py-16 xl:pr-14">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#a78356] sm:text-base">
              KLOOM STUDIO · BANGKOK
            </p>
            <div className="mb-5 h-px w-20 bg-[#b7905c]" />

            <h2 className="text-[40px] font-semibold leading-[1.5] tracking-normal text-[#493122] sm:text-[50px] lg:text-[54px] xl:text-[60px]">
              บริการสกรีน
              <span className="block">ถุงคลุมชุด</span>
            </h2>
            <p className="mt-3 max-w-[690px] text-[18px] leading-[1.85] tracking-normal text-[#675648] sm:text-[21px]">
              งานสกรีนสวย คมชัด เพิ่มเอกลักษณ์ให้กับแบรนด์ของคุณ
              สำหรับร้านเช่าชุด ร้านสูท และร้านเวดดิ้ง
            </p>

            <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#d6ba8f] bg-white/80 px-5 py-3 text-[16px] font-medium leading-[1.8] text-[#705032] sm:text-[25px] shadow-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#9a753f]" />
              รับสกรีนขั้นต่ำ 3 โหล · คละขนาดได้
            </div>

            {/* ราคาพิมพ์ด้วย HTML จึงแก้ราคาและข้อความได้ตลอด */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {priceTiers.map((tier) => (
                <article
                  key={tier.title}
                  className="overflow-hidden rounded-[18px] border border-[#c9a77a] bg-[#fffaf3]/95 shadow-[0_12px_34px_rgba(66,47,29,0.10)] backdrop-blur-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-[#40342e] px-4 py-4 text-[#f7e2bf]">
                    <span className="text-[16px] font-semibold leading-[1.8] sm:text-[17px]">{tier.title}</span>
                    <span className="text-[16px] font-medium leading-[1.8] sm:text-[17px]">ขั้นต่ำ {tier.minOrder}</span>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-[#ead9c3] p-5">
                    <div className="pr-3">
                      <p className="text-[16px] font-medium leading-[1.8] text-[#77695d]">ค่าสกรีน</p>
                      <p className="mt-2 text-[36px] font-bold leading-[1.25] tracking-normal text-[#987044] sm:text-[39px]">
                        {tier.screenPrice}
                      </p>
                      <p className="mt-2 text-[14px] leading-[1.85] text-[#605247] sm:text-[15px]">
                        {tier.screenUnit}
                      </p>
                    </div>
                    <div className="pl-3">
                      <p className="text-[16px] font-medium leading-[1.8] text-[#77695d]">ค่าบล็อก</p>
                      <p className="mt-2 text-[36px] font-bold leading-[1.25] text-[#987044] sm:text-[39px]">
                        {tier.blockPrice}
                      </p>
                      <p className="mt-2 text-[14px] leading-[1.85] text-[#605247] sm:text-[15px]">
                        {tier.blockUnit}
                      </p>
                      <p className="mt-1 text-[14px] leading-[1.9] text-[#897c6a]">
                        ({tier.blockNote})
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e9d3af] px-5 py-3 text-[18px] font-semibold leading-[1.85] text-[#5e422c]">
                <CheckCircle2 className="h-5 w-5" /> คละขนาดได้ค่ะ
              </span>
              <span className="text-[16px] leading-[1.85] text-[#75675a]">
                ค่าสกรีนคิด 1 จุด ต่อ 1 สี
              </span>
            </div>

            <p className="mt-5 text-[16px] leading-[1.9] text-[#786b60]">
              * ราคานี้เฉพาะค่าสกรีนและค่าบล็อก ไม่รวมราคาถุงคลุมชุด
            </p>

            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex w-fit items-center justify-center gap-3 rounded-full bg-[#5a4030] px-8 py-4 text-[19px] font-semibold leading-[1.85] text-[#fffaf1] shadow-[0_10px_25px_rgba(67,47,29,0.18)] transition-colors hover:bg-[#806044] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8f673a]"
            >
              ติดต่อสั่งทำทาง LINE
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* จุดเด่นบริการ — ต่อจากชุดไอคอนของโค้ดเดิม */}
      <div className="w-full bg-[#302b32] text-white">
        <div className="mx-auto max-w-[1640px] px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
          <div className="mb-10 text-center">
            <p className="text-[14px] uppercase tracking-[0.22em] text-[#d5b582] sm:text-[16px]">WHY KLOOM STUDIO</p>
            <h3 className="mt-3 text-[28px] font-semibold leading-[1.6] tracking-normal sm:text-[36px]">ใส่ใจทุกขั้นตอน เพื่อแบรนด์ของคุณ</h3>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#b79468]/30 bg-white/[0.04] p-6 transition-colors hover:bg-white/[0.07]"
              >
                <Icon className="mb-5 h-9 w-9 text-[#d5b582]" strokeWidth={1.5} />
                <h4 className="mb-2 text-[22px] font-semibold leading-[1.65] text-[#fff5e9]">{title}</h4>
                <p className="text-[17px] leading-[1.85] text-[#d2cbd0]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* แกลเลอรีภาพประกอบ — ใช้รูปภาพจริง ไม่มีตัวหนังสือฝังบนรูป */}
      <div className="grid w-full grid-cols-1 md:grid-cols-2">
        <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[465px]">
          <Image
            src={WORKSHOP_IMAGE}
            alt="ภาพประกอบขั้นตอนงานตัดเย็บและการผลิตถุงคลุมชุด"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
        <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[465px]">
          <Image
            src={PRODUCT_DETAIL_IMAGE}
            alt="ภาพถุงคลุมชุดและอุปกรณ์ตัดเย็บในสตูดิโอสไตล์พรีเมียม"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#251c1c]/65 via-transparent to-transparent" />
          <div className="absolute bottom-7 left-7 right-7 text-white sm:bottom-10 sm:left-10">
            <Sparkles className="mb-3 h-7 w-7 text-[#e8cc9d]" strokeWidth={1.5} />
            <p className="font-serif text-2xl font-semibold sm:text-3xl">KLOOM STUDIO</p>
            <p className="mt-2 text-[17px] leading-[1.85] text-white/90 sm:text-[19px]">
              สวยงามทุกดีเทล เพิ่มคุณค่าให้ทุกชุด
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
