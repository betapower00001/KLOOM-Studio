"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BlogsPage() {
  const articles = [
    {
      id: 1,
      title: "ทำไมห้องเสื้อควรใช้ถุงคลุมชุดพร้อมสกรีนโลโก้",
      desc: "รายละเอียดเล็ก ๆ ที่ช่วยยกระดับภาพลักษณ์และความหรูของแบรนด์แฟชั่น.",
      img: "/Picblog-1.jpg",
      href: "/blogs/luxury-dress-cover",
    },
    {
      id: 2,
      title: "วิธีเลือกขนาดถุงคลุมสูทให้เหมาะกับชุด",
      desc: "เลือกถุงคลุมชุดไทย–ชุดราตรี ให้เหมาะกับประเภทของชุด.",
      img: "/Picblog-2.jpg",
      href: "/blogs/select-size-suit-cover",
    },
    {
      id: 3,
      title: "ข้อดีของถุงคลุมชุดแบบขายส่ง",
      desc: "เหมาะกับธุรกิจแฟชั่นที่ต้องการลดต้นทุนโดยไม่ลดความพรีเมียม.",
      img: "/Picblog-3.jpg",
      href: "/blogs/wholesale-cover-benefits",
    },
    {
      id: 4,
      title: "พีวีซีใส 0.8 มิล วัสดุถุงคลุมชุดสูท",
      desc: "วัสดุโปร่งใส เรียบหรู เหมาะกับแบรนด์ที่ต้องการโชว์คุณภาพของสินค้า.",
      img: "/Picblog-4.jpg",
      href: "/blogs/pvc-material-0.8mm",
    },
    {
      id: 5,
      title: "ผ้าสปันบอนด์ วัสดุถุงคลุมชุดสูท",
      desc: "วัสดุยอดนิยมในวงการแฟชั่น ด้วยความแข็งแรง น้ำหนักเบา และดูดี.",
      img: "/Picblog-5.jpg",
      href: "/blogs/nonwoven-material",
    },
  ];

  return (
    <section className="relative pt-[150px] pb-24 bg-gradient-to-br from-[#f9f7f3] to-[#ebe6dd] text-gray-900 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[url('/images/texture-luxury-bg.jpg')] bg-cover bg-center opacity-10"
        initial={{ backgroundPositionY: "0%" }}
        animate={{ backgroundPositionY: "100%" }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-semibold text-center mb-16 tracking-wide text-[#2b2b2b]"
        >
          บทความจากห้องเสื้อและบรรจุภัณฑ์แฟชั่น
        </motion.h1>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12">
          {articles.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <Link
                href={a.href}
                className="group block bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="overflow-hidden">
                  <Image
                    src={a.img}
                    alt={a.title}
                    width={800}
                    height={600}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>

                <div className="p-8">
                  <h2 className="text-2xl font-semibold mb-4 text-[#2b2b2b] group-hover:text-[#b79c6d] transition">
                    {a.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{a.desc}</p>
                  <span className="text-[#b79c6d] font-medium">อ่านเพิ่มเติม →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
