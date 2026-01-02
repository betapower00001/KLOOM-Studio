
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type PageProps = {
  params: {
    id: string;
  };
};
const galleries: Record<string, string[]> = {
  "1": [
    "/review/reviwe-1.jpg",
    "/review/reviwe-2.jpg",
    "/review/reviwe-3.jpg",
    "/review/reviwe-4.jpg",
    "/review/reviwe-5.jpg",
    "/review/reviwe-6.jpg",
    "/review/reviwe-7.jpg",
    "/review/reviwe-8.jpg",
    "/review/reviwe-9.jpg",
    "/review/reviwe-10.jpg",
    "/review/reviwe-11.jpg",
    "/review/reviwe-12.jpg",
    "/review/reviwe-13.jpg",
    "/review/reviwe-14.jpg",
    "/review/reviwe-15.jpg",
    "/review/reviwe-16.jpg",
    "/review/reviwe-17.jpg",
    "/review/reviwe-18.jpg",
    "/review/reviwe-19.jpg",
    "/review/reviwe-20.jpg",
    "/review/reviwe-21.jpg",
    "/review/reviwe-22.jpg",
    "/review/reviwe-23.jpg",
    "/review/reviwe-24.jpg",
    "/review/reviwe-25.jpg",
    "/review/reviwe-26.jpg",
    "/review/reviwe-27.jpg",
    "/review/reviwe-28.jpg",
    "/review/reviwe-29.jpg",
    "/review/reviwe-30.jpg",
    "/review/reviwe-31.jpg",
    "/review/reviwe-32.jpg",
    "/review/reviwe-33.jpg",
    "/review/reviwe-34.jpg",
    "/review/reviwe-35.jpg",
    "/review/reviwe-36.jpg",
    "/review/reviwe-37.jpg",
    "/review/reviwe-38.jpg",
    "/review/reviwe-39.jpg",
    "/review/reviwe-40.jpg",
    "/review/reviwe-41.jpg",
    "/review/reviwe-42.jpg",
    "/review/reviwe-43.jpg",
    "/review/reviwe-44.jpg",
    "/review/reviwe-45.jpg",
    "/review/reviwe-46.jpg",
    "/review/reviwe-47.jpg",
  ],
  "2": ["/review/reviwe-1.jpg",
    "/review/reviwe-2.jpg",
    "/review/reviwe-3.jpg",
    "/review/reviwe-4.jpg",
    "/review/reviwe-5.jpg",
    "/review/reviwe-6.jpg",
    "/review/reviwe-7.jpg",
    "/review/reviwe-8.jpg",
    "/review/reviwe-9.jpg",
    "/review/reviwe-10.jpg",
    "/review/reviwe-11.jpg",
    "/review/reviwe-12.jpg",
    "/review/reviwe-13.jpg",
    "/review/reviwe-14.jpg",
    "/review/reviwe-15.jpg",
    "/review/reviwe-16.jpg",
    "/review/reviwe-17.jpg",
    "/review/reviwe-18.jpg",
    "/review/reviwe-19.jpg",
    "/review/reviwe-20.jpg",
    "/review/reviwe-21.jpg",
    "/review/reviwe-22.jpg",
    "/review/reviwe-23.jpg",
    "/review/reviwe-24.jpg",
    "/review/reviwe-25.jpg",
    "/review/reviwe-26.jpg",
    "/review/reviwe-27.jpg",
    "/review/reviwe-28.jpg",
    "/review/reviwe-29.jpg",
    "/review/reviwe-30.jpg",
    "/review/reviwe-31.jpg",
    "/review/reviwe-32.jpg",
    "/review/reviwe-33.jpg",
    "/review/reviwe-34.jpg",
    "/review/reviwe-35.jpg",
    "/review/reviwe-36.jpg",
    "/review/reviwe-37.jpg",
    "/review/reviwe-38.jpg",
    "/review/reviwe-39.jpg",
    "/review/reviwe-40.jpg",
    "/review/reviwe-41.jpg",
    "/review/reviwe-42.jpg",
    "/review/reviwe-43.jpg",
    "/review/reviwe-44.jpg",
    "/review/reviwe-45.jpg",
    "/review/reviwe-46.jpg",
    "/review/reviwe-47.jpg",],
  "3": ["/review/reviwe-1.jpg",
    "/review/reviwe-2.jpg",
    "/review/reviwe-3.jpg",
    "/review/reviwe-4.jpg",
    "/review/reviwe-5.jpg",
    "/review/reviwe-6.jpg",
    "/review/reviwe-7.jpg",
    "/review/reviwe-8.jpg",
    "/review/reviwe-9.jpg",
    "/review/reviwe-10.jpg",
    "/review/reviwe-11.jpg",
    "/review/reviwe-12.jpg",
    "/review/reviwe-13.jpg",
    "/review/reviwe-14.jpg",
    "/review/reviwe-15.jpg",
    "/review/reviwe-16.jpg",
    "/review/reviwe-17.jpg",
    "/review/reviwe-18.jpg",
    "/review/reviwe-19.jpg",
    "/review/reviwe-20.jpg",
    "/review/reviwe-21.jpg",
    "/review/reviwe-22.jpg",
    "/review/reviwe-23.jpg",
    "/review/reviwe-24.jpg",
    "/review/reviwe-25.jpg",
    "/review/reviwe-26.jpg",
    "/review/reviwe-27.jpg",
    "/review/reviwe-28.jpg",
    "/review/reviwe-29.jpg",
    "/review/reviwe-30.jpg",
    "/review/reviwe-31.jpg",
    "/review/reviwe-32.jpg",
    "/review/reviwe-33.jpg",
    "/review/reviwe-34.jpg",
    "/review/reviwe-35.jpg",
    "/review/reviwe-36.jpg",
    "/review/reviwe-37.jpg",
    "/review/reviwe-38.jpg",
    "/review/reviwe-39.jpg",
    "/review/reviwe-40.jpg",
    "/review/reviwe-41.jpg",
    "/review/reviwe-42.jpg",
    "/review/reviwe-43.jpg",
    "/review/reviwe-44.jpg",
    "/review/reviwe-45.jpg",
    "/review/reviwe-46.jpg",
    "/review/reviwe-47.jpg",],
};
export default function ReviewPage({ params }: PageProps) {
  const { id } = params; // ✅ Next 14 ถูกต้อง
  const images = galleries[id];

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        ไม่พบรีวิว
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white px-4 py-16">
      <Link
        href="/"
        className="fixed top-6 left-6 z-10 text-white opacity-70 hover:opacity-100 transition"
      >
        ← กลับ
      </Link>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setActive(index);
              setOpen(true);
            }}
            className="group relative"
          >
            <Image
              src={img}
              alt={`Review ${index + 1}`}
              width={600}
              height={800}
              priority={index < 3}
              className="w-full h-full object-cover rounded-xl group-hover:scale-[1.03] transition"
            />

            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition">
              <span className="text-white opacity-0 group-hover:opacity-100 text-sm">
                คลิกเพื่อขยาย
              </span>
            </span>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          <div onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[active]}
              alt="Zoom"
              width={1800}
              height={1200}
              className="max-h-[90vh] w-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}