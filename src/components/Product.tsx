"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { ProductCategory } from "@/lib/cms/types";

/* ---------------------- COMPONENT ---------------------- */

export default function ProductPage() {
  // Never show hard-coded colors in production while waiting for the CMS API.
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loadStatus, setLoadStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const response = await fetch("/api/cms/products", { cache: "no-store" });
        if (!response.ok) throw new Error(`Product API returned ${response.status}`);
        const data: unknown = await response.json();
        if (!Array.isArray(data)) throw new Error("Product API response is not an array");
        if (!active) return;
        setCategories(data as ProductCategory[]);
        setLoadStatus("ready");
      } catch (error) {
        console.error("Failed to load live CMS products", error);
        if (!active) return;
        setCategories([]);
        setLoadStatus("error");
      }
    }

    void loadProducts();
    return () => { active = false; };
  }, []);

  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, { image: string; price: string }>
  >({});

  useEffect(() => {
    setSelectedVariants((current) => {
      const next = { ...current };
      categories.forEach((category) => {
        category.products.forEach((product) => {
          const defaultColor = product.colors[0];
          const productKey = product.dbId ?? `${category.id ?? category.size}-${product.id}`;
          if (defaultColor && !next[productKey]) {
            next[productKey] = {
              image: defaultColor.image,
              price: defaultColor.price,
            };
          }
        });
      });
      return next;
    });
  }, [categories]);

  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // refs (ใช้ object dictionary)
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleColorClick = (productKey: string, image: string, price: string) => {
    setSelectedVariants((prev) => ({ ...prev, [productKey]: { image, price } }));
  };

  const scrollToCategory = (size: string, offset = 50) => {
    const el = categoryRefs.current[size];
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="Product" className="w-full bg-gray-50 px-4 md:px-10 py-10">
      
      {/* HEADER */}
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">ถุงคลุมชุดสูท</h1>
        <p className="text-gray-700 mt-2 text-lg sm:text-xl">
          สินค้าคุณภาพ วัสดุผลิตจากวัสดุชั้นดี
        </p>
      </header>

      {loadStatus === "loading" && (
        <p role="status" className="mb-8 text-center text-gray-600">กำลังโหลดข้อมูลสินค้าล่าสุด…</p>
      )}
      {loadStatus === "error" && (
        <div role="alert" className="mb-8 rounded-xl border border-red-200 bg-red-50 p-5 text-center text-red-800">
          ไม่สามารถโหลดสินค้าจากระบบหลังบ้านได้ กรุณาลองรีเฟรชหน้าเว็บอีกครั้ง
        </div>
      )}
      {loadStatus === "ready" && categories.length === 0 && (
        <p className="mb-8 text-center text-gray-600">ขณะนี้ยังไม่มีสินค้าที่เปิดแสดงบนเว็บไซต์</p>
      )}

      {/* LOOP CATEGORY */}
      {categories.map((category) => (
        <div
          key={category.size}
          ref={(el) => {
            categoryRefs.current[category.size] = el;
          }}
          className="mb-12"
        >
          {/* MOBILE CATEGORY BUTTON */}
          {isMobile && (
            <button
              className="w-full flex justify-between items-center p-4 rounded-md mb-4 bg-[#deb18a]"
              onClick={() => {
                const nextState = openCategory === category.size ? null : category.size;
                setOpenCategory(nextState);
                if (nextState) {
                  setTimeout(() => scrollToCategory(nextState), 150);
                }
              }}
            >
              <span className="font-semibold text-lg">{category.size}</span>
              <span className="text-xl">{openCategory === category.size ? "−" : "+"}</span>
            </button>
          )}

          {/* DESKTOP TITLE */}
          {!isMobile && (
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
              ขนาด {category.size}
            </h2>
          )}

          {/* CONTENT */}
          {(!isMobile || openCategory === category.size) && (
            <>
              {/* PRODUCT LIST */}
              <div className="flex flex-wrap -mx-4 mb-6">
                {category.products.map((product) => (
                  <motion.div
                    key={product.dbId ?? `${category.size}-${product.id}`}
                    className="w-full md:w-1/2 px-4 mb-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                  >
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-6 items-center">
                      {/* IMAGE */}
                      <div className="w-full md:w-1/2 flex justify-center">
                        <div className="relative w-full sm:max-w-[400px] aspect-[4/5]">
                          <Image
                            src={selectedVariants[product.dbId ?? `${category.id ?? category.size}-${product.id}`]?.image || product.colors[0]?.image || product.mainImage || "/placeholder.svg"}
                            alt={product.name}
                            unoptimized
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>

                      {/* DETAILS */}
                      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                          {product.name}
                        </h3>
                        <p className="text-lg sm:text-xl text-gray-700">{product.desc}</p>

                        <p className="font-semibold text-gray-800 mt-2">Other colors</p>

                        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                          {product.colors.map((color) => (
                            <div
                              key={color.id}
                              onClick={() =>
                                handleColorClick(product.dbId ?? `${category.id ?? category.size}-${product.id}`, color.image, color.price)
                              }
                              className={`relative w-20 h-28 border rounded cursor-pointer overflow-hidden transition ${(selectedVariants[product.dbId ?? `${category.id ?? category.size}-${product.id}`]?.image ?? product.colors[0]?.image) === color.image
                                  ? "border-gray-800 shadow-md"
                                  : "border-gray-200 hover:border-gray-400"
                                }`}
                            >
                              <div className="relative w-full h-20">
                                <Image
                                  src={color.image || "/placeholder.svg"}
                                  alt={color.label}
                                  unoptimized
                                  fill
                                  className="object-contain p-1"
                                />
                              </div>
                              <div className="w-full text-center text-base font-medium text-gray-700 py-1 bg-gray-100">
                                {color.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <p className="text-3xl font-bold text-[#deb18a] mt-4">
                          {selectedVariants[product.dbId ?? `${category.id ?? category.size}-${product.id}`]?.price ?? product.colors[0]?.price ?? ""}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ADDONS */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                เพิ่มเติมจุดต่างๆ
              </h3>

              <div className="flex flex-wrap -mx-4">
                {category.addons.map((addon) => (
                  <div key={addon.id} className="w-1/2 md:w-1/4 px-4 mb-6">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col items-center gap-2">
                      <div className="relative w-full h-28">
                        <Image src={addon.image || "/placeholder.svg"} alt={addon.name} unoptimized fill sizes="160px" className="object-contain" />
                      </div>
                      <p className="text-center font-medium text-gray-700 text-[22px]">
                        {addon.name}
                      </p>
                      <p className="text-center font-bold text-[#deb18a] text-[22px]">
                        {addon.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
}
