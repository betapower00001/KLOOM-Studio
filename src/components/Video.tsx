"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Article() {
    return (
        <section className="py-24 bg-gradient-to-br from-[#f9f7f3] to-[#e9e4dc] text-gray-900">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-14">

                {/* วีดีโอด้านซ้าย */}
                <div className="md:w-1/2 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent rounded-3xl pointer-events-none"></div>
                    <video
                        src="/video-1.mp4"
                        poster="/Picblog-1.jpg"
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full rounded-3xl shadow-2xl object-cover"
                    />
                </div>

                {/* เนื้อหาด้านขวา */}
                <motion.div
                    className="md:w-1/2"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className="text-4xl font-semibold mb-6 text-center md:text-left tracking-wide text-[#2b2b2b]"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        ถุงคลุมชุดที่ดี ไม่ได้แค่ปกป้องเสื้อผ้า แต่สร้างคุณค่าให้แบรนด์
                    </motion.h2>

                    <motion.p
                        className="text-lg leading-relaxed text-gray-700 mb-10"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        ในโลกแฟชั่นระดับพรีเมียม รายละเอียดเล็ก ๆ คือสิ่งที่สร้างความแตกต่าง{" "}
                        <strong className="text-[#b79c6d]">ถุงคลุมชุดพร้อมโลโก้แบรนด์</strong>{" "}
                        ไม่เพียงช่วยปกป้องเสื้อผ้าจากฝุ่นและความชื้น
                        แต่ยังช่วยยกระดับภาพลักษณ์ให้ดูมืออาชีพและน่าจดจำ
                        ดีไซน์ที่สวยงามและวัสดุคุณภาพดีจะสะท้อนความใส่ใจของแบรนด์
                        และทำให้ลูกค้ารู้สึกถึงความหรูหราในทุกการสัมผัส
                    </motion.p>


                    <div className="text-center md:text-left">
                        <Link
                            href="https://line.me/ti/p/~@kloomstudio"
                            className="inline-block px-8 py-3 bg-[#2b2b2b] text-white rounded-full hover:bg-[#b79c6d] hover:text-white transition-all duration-300 shadow-md"
                        >
                            สั่งทำทันที
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
