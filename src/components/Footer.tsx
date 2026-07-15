"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { CmsSettings } from "@/lib/cms/types";

const fallbackContact: CmsSettings["contact"] = {
  phone: "088-642-4699",
  line: "@kloomstudio",
  email: "gowgalz@gmail.com",
  address: "215 เพชรเกษม 28 แยก 22 เขตภาษีเจริญ กรุงเทพมหานคร 10160",
};

export default function Footer() {
  const pathname = usePathname();
  const [contact, setContact] = useState(fallbackContact);

  const navLinks = [
    { name: "เกี่ยวกับ", id: "about" },
    { name: "บริการ", id: "Services" },
    { name: "ฟังชั่นเสริม", id: "Exaddon" },
    { name: "สินค้า", id: "Product" },
    { name: "ติดต่อ", id: "Footer" },
  ];

  useEffect(() => {
    fetch("/api/cms/settings", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data?.contact) setContact({ ...fallbackContact, ...data.contact });
      })
      .catch(() => undefined);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const lineId = contact.line.replace(/^@/, "");

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative overflow-hidden bg-gradient-to-b from-[#2f2f3f] via-[#252532] to-[#1a1a24] py-16 tracking-wide text-white"
    >
      <div
        id="Footer"
        className="absolute left-0 top-0 z-20 h-[2px] w-full bg-gradient-to-r from-[#deb18a]/40 via-[#deb18a] to-[#deb18a]/40 animate-pulse-slow"
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/35 md:bg-black/25" />

      <div className="container relative z-10 mx-auto grid grid-cols-1 gap-12 px-6 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <Image src="/logo-white.png" alt="KLOOM Studio Logo" width={120} height={80} className="opacity-90" />
            </motion.div>
            <h2 className="mt-1 bg-gradient-to-r from-[#f5e6c8] via-[#deb18a] to-[#f5e6c8] bg-clip-text text-2xl font-bold uppercase tracking-[0.15em] text-transparent drop-shadow-[0_1px_3px_rgba(255,255,255,0.15)]">
              KLOOM Studio
            </h2>
          </div>
          <p className="mx-auto max-w-sm text-center text-sm leading-relaxed text-gray-300">
            จำหน่ายถุงคลุมชุดทุกประเภท ปลีก-ส่ง <br />
            มีบริการรับสกรีนโลโก้ จัดส่งทั่วประเทศ
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold uppercase text-[#deb18a]">Explore</h3>
          <ul className="space-y-2 text-sm">
            {navLinks.map((item) => (
              <li key={item.id}>
                <Link href={`/#${item.id}`} className="text-gray-300 transition-colors duration-300 hover:text-[#deb18a] hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold uppercase text-[#deb18a]">Contact</h3>
          <p className="mb-1 text-sm leading-6 text-gray-300">📍 {contact.address}</p>
          <p className="mb-1 text-sm text-gray-300">📞 {contact.phone}</p>
          <p className="text-sm text-gray-300">✉️ {contact.email}</p>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold uppercase text-[#deb18a]">Follow Us</h3>
          <div className="flex flex-col space-y-2 text-sm text-gray-300">
            <a
              href="https://www.facebook.com/people/%E0%B8%96%E0%B8%B8%E0%B8%87%E0%B8%84%E0%B8%A5%E0%B8%B8%E0%B8%A1%E0%B8%8A%E0%B8%B8%E0%B8%94%E0%B8%AA%E0%B8%B9%E0%B8%97-%E0%B9%84%E0%B8%97%E0%B8%A2-%E0%B8%A3%E0%B8%B2%E0%B8%95%E0%B8%A3%E0%B8%B5-KLOOM-Studio/61577163384916"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105 hover:text-[#deb18a]"
            >
              <Facebook size={16} />
              <span>Facebook</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105 hover:text-[#deb18a]"
            >
              <Instagram size={16} />
              <span>Instagram</span>
            </a>
            <a
              href={`https://line.me/ti/p/~@${lineId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105 hover:text-[#deb18a]"
            >
              <MessageCircle size={16} />
              <span>Line Official {contact.line}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 border-t border-[#deb18a]/20 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} <span className="font-medium text-[#deb18a]">KLOOM Studio</span>. All rights reserved.
      </div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_#deb18a_0%,_transparent_70%)] opacity-25 animate-gradient-move" />
    </motion.footer>
  );
}
