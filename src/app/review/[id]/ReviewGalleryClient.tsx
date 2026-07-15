"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type ReviewGalleryImage = {
  id?: string;
  image_url: string;
  alt_text: string;
};

export default function ReviewGalleryClient({
  images,
}: {
  images: ReviewGalleryImage[];
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-400">
        ไม่พบรีวิว
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white px-4 py-16">
      <Link
        href="/"
        className="fixed left-6 top-6 z-10 text-white opacity-70 transition hover:opacity-100"
      >
        ← กลับ
      </Link>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {images.map((item, index) => (
          <button
            key={item.id ?? `${item.image_url}-${index}`}
            type="button"
            onClick={() => {
              setActive(index);
              setOpen(true);
            }}
            className="group relative"
          >
            <Image
              src={item.image_url}
              alt={item.alt_text || `Review ${index + 1}`}
              width={600}
              height={800}
              priority={index < 3}
              loading={index < 6 ? "eager" : "lazy"}
              className="h-full w-full rounded-xl object-cover transition group-hover:scale-[1.03]"
            />

            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/40">
              <span className="text-sm text-white opacity-0 group-hover:opacity-100">
                คลิกเพื่อขยาย
              </span>
            </span>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute right-6 top-6 text-3xl text-white"
            onClick={() => setOpen(false)}
            aria-label="ปิดรูป"
          >
            ✕
          </button>

          <div onClick={(event) => event.stopPropagation()}>
            <Image
              src={images[active].image_url}
              alt={images[active].alt_text || "Zoom"}
              width={1800}
              height={1200}
              className="max-h-[90vh] w-auto rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
