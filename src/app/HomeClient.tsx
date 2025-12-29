// app/HomeClient.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BounceLoader from "react-spinners/BeatLoader";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Exaddon from "@/components/Exaddon";
import Performance from "@/components/Performance";
import Product from "@/components/Product";
import Article from "@/components/Article";
import Blogs from "@/app/blogs/page";
import Video from "@/components/Video";

export default function HomeClient() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new window.Image(); // 👈 native preload (ไม่เกี่ยว ESLint)
    img.src = "/logo-white.png";
    img.onload = () => setTimeout(() => setLoading(false), 300);
  }, []);

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <Image
            src="/logo-white.png"
            alt="Loading Logo"
            width={200}
            height={200}
            priority
          />
          <BounceLoader color="white" loading={loading} size={12.5} />
        </div>
      )}

      {!loading && (
        <main className="flex flex-col">
          <Hero />
          <About />
          <Video />
          <Product />
          <Services />
          <Stats />
          <Testimonials />
          <Exaddon />
          <Performance />
          <Article />
          <Blogs />
        </main>
      )}
    </>
  );
}
