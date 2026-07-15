"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CmsSettings } from "@/lib/cms/types";

const fallbackHero: CmsSettings["hero"] = {
  title: "เพราะสไตล์ของคุณ…ไม่เหมือนใคร",
  subtitle: "เราพร้อมออกแบบลุคในแบบที่เป็นตัวคุณ",
  image_url: "/image-1.jpg",
  button_text: "Discover More",
};

export default function Hero() {
  const [hero, setHero] = useState(fallbackHero);

  useEffect(() => {
    fetch("/api/cms/settings", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data?.hero) setHero({ ...fallbackHero, ...data.hero });
      })
      .catch(() => undefined);
  }, []);

  return (
    <section
      className="relative flex h-[90vh] items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${hero.image_url || fallbackHero.image_url})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 px-4 text-center text-white">
        <h1 className="mb-6 text-4xl font-bold leading-tight drop-shadow-lg animate-fadeInDown md:text-6xl">
          {hero.title}
        </h1>
        <p className="mb-8 text-lg text-gray-200 animate-fadeInUp md:text-xl">
          {hero.subtitle}
        </p>
        <Link href="#Product" scroll>
          <button className="rounded-full bg-white px-8 py-3 font-semibold text-black shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#deb18a] hover:text-white animate-fadeInUp">
            {hero.button_text}
          </button>
        </Link>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown { animation: fadeInDown 1s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 1.2s ease-out forwards; }
      `}</style>
    </section>
  );
}
