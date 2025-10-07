"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative text-white py-16 overflow-hidden bg-gradient-to-b from-[#454456] to-[#2e2e3a] tracking-wide"
    >
      {/* เส้นแสงทองด้านบน กระพริบเบา ๆ */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#deb18a]/30 via-[#deb18a] to-[#deb18a]/30 animate-pulse-slow" />

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <Image
                src="/logo.png"
                alt="KLOOM Studio Logo"
                width={42}
                height={42}
                className="opacity-90"
              />
            </motion.div>
            <h2 className="text-2xl font-bold uppercase tracking-[0.15em] bg-gradient-to-r from-[#f5e6c8] via-[#deb18a] to-[#f5e6c8] text-transparent bg-clip-text drop-shadow-[0_1px_3px_rgba(255,255,255,0.15)]">
              KLOOM Studio
            </h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
            ความหรูหราที่สั่งตัดได้ — ออกแบบเฉพาะคุณด้วยความประณีตและสไตล์เหนือระดับ
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg font-semibold text-[#deb18a] mb-3 uppercase">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "หน้าแรก", path: "/" },
              { name: "คอลเลกชัน", path: "/collection" },
              { name: "บริการตัดเย็บ", path: "/services" },
              { name: "ติดต่อเรา", path: "/contact" },
            ].map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.path}
                  className="hover:text-[#deb18a] transition-colors duration-300 hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-[#deb18a] mb-3 uppercase">
            Contact
          </h3>
          <p className="text-sm text-gray-300 mb-1">📍 123-Avenue, Bangkok, Thailand</p>
          <p className="text-sm text-gray-300 mb-1">📞 +66 99-999-9999</p>
          <p className="text-sm text-gray-300">✉️ info@kloomstudio.com</p>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-[#deb18a] mb-3 uppercase">
            Follow Us
          </h3>
          <div className="flex flex-col space-y-2 text-sm text-gray-300">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#deb18a] transition-colors duration-300 hover:scale-105"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#deb18a] transition-colors duration-300 hover:scale-105"
            >
              Instagram
            </a>
            <a
              href="https://line.me/ti/p/~kloomstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#deb18a] transition-colors duration-300 hover:scale-105"
            >
              Line Official
            </a>
          </div>
        </div>
      </div>

      {/* เส้นขอบข้อความล่าง */}
      <div className="border-t border-[#deb18a]/20 mt-12 pt-6 text-center text-sm text-gray-400 relative z-10">
        © 2025 <span className="text-[#deb18a] font-medium">KLOOM Studio</span>. All rights reserved.
      </div>

      {/* แสงทอง radial gradient เคลื่อนไหว */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_#deb18a_0%,_transparent_70%)] animate-gradient-move" />
    </motion.footer>
  );
}
