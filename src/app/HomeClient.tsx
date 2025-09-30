// app/HomeClient.tsx
"use client";

import { useState, useEffect } from "react";
import BounceLoader from "react-spinners/BeatLoader";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Blog from "@/components/Blog";
import Product from "@/components/Product";

export default function HomeClient() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = "/logo-white.png";
    img.onload = () => setTimeout(() => setLoading(false), 300);
  }, []);

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <img src={"/logo-white.png"} width="200" alt="Loading Logo" />
          <BounceLoader color="white" loading={loading} size={12.5} />
        </div>
      )}

      {!loading && (
        <main className="flex flex-col">
          <Hero />
          <About />
          <Product />
          <Services />
          <Stats />
          <Testimonials />
          <Team />
          <Blog />
        </main>
      )}
    </>
  );
}
