"use client";

import { useEffect, useState } from "react";
import type { CmsTestimonial } from "@/lib/cms/types";

const fallback: CmsTestimonial = {
  customer_name: "KLOOM Studio",
  quote: "KLOOM Studio — เติมเต็มความเนี๊ยบให้ทุกการแต่งตัว",
  image_url: "",
  published: true,
  sort_order: 1,
};

export default function Testimonials() {
  const [testimonial, setTestimonial] = useState<CmsTestimonial>(fallback);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/cms/testimonials", {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data[0]) setTestimonial(data[0]);
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-500 mb-12">
          เพราะทุกคำพูดมีคุณค่า
        </h2>

        <div className="max-w-4xl mx-auto">
          <span className="text-6xl md:text-7xl text-gray-400 align-top">“</span>
          <p className="italic text-2xl md:text-3xl text-gray-800 leading-relaxed inline-block mx-2">
            {testimonial.quote || fallback.quote}
          </p>
          <span className="text-6xl md:text-7xl text-gray-400 align-bottom">”</span>

          {testimonial.customer_name && testimonial.customer_name !== "KLOOM Studio" && (
            <p className="mt-5 text-lg text-gray-500">— {testimonial.customer_name}</p>
          )}
        </div>
      </div>
    </section>
  );
}
