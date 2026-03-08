"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type PageProps = {
  params: {
    id: string;
  };
};

/* =========================
   AUTO GENERATE GALLERY
========================= */

const createGallery = (start: number, end: number) =>
  Array.from(
    { length: end - start + 1 },
    (_, i) => `/review/reviwe-${i + start}.jpg`
  );

/* =========================
   GALLERY DATA
========================= */

const galleries: Record<string, string[]> = {
  "1": createGallery(1, 120),
  "2": createGallery(1, 120),
  "3": createGallery(1, 120),
};

export default function ReviewPage({ params }: PageProps) {
  const { id } = params;
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

      {/* =========================
         GALLERY GRID
      ========================= */}

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
              loading={index < 6 ? "eager" : "lazy"}
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

      {/* =========================
         MODAL VIEW
      ========================= */}

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