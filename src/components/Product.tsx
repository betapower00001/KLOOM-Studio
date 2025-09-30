"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProductPage() {
  const categories = [
    {
      size: "25x70 นิ้ว",
      products: [
        {
          id: 1,
          name: "พีวีซีใส / พีวีซีใส",
          desc: "ขนาด 25x70 นิ้ว",
          price: "400 บาท/โหล",
          mainImage: "/PVC-Clear.png",
          colors: [
            { id: "clear", image: "/PVC-Clear.png", label: "ใส" },
          ],
        },
        {
          id: 2,
          name: "พีวีซีใส / สปันบอนด์",
          desc: "ขนาด 25x70 นิ้ว",
          price: "400 บาท/โหล",
          mainImage: "/PVC-Spon-white.png",
          colors: [
            { id: "white", image: "/PVC-Spon-white.png", label: "ขาว" },
            { id: "gray", image: "/PVC-Spon-gray.png", label: "เทา" },
            { id: "beige", image: "/PVC-Spon-beige.png", label: "เบจ(เนื้อ)" },
            { id: "brow", image: "/PVC-Spon-brow.png", label: "น้ำตาลช็อคโกแลต" },
            { id: "blue", image: "/PVC-Spon-blue.png", label: "กรมท่า" },
            { id: "black", image: "/PVC-Spon-black.png", label: "ดำ" },

          ],
        },
        {
          id: 3,
          name: "สปันบอนด์ / สปันบอนด์",
          desc: "ขนาด 25x70 นิ้ว",
          price: "500 บาท/โหล",
          mainImage: "/Spon-Spon-white.png",
          colors: [
            { id: "white", image: "/Spon-Spon-white.png", label: "ขาว" },
            { id: "gray", image: "/Spon-Spon-gray.png", label: "เทา" },
            { id: "beige", image: "/Spon-Spon-beige.png", label: "เบจ(เนื้อ)" },
            { id: "brow", image: "/Spon-Spon-brow.png", label: "น้ำตาลช็อคโกแลต" },
            { id: "blue", image: "/Spon-Spon-blue.png", label: "กรมท่า" },
            { id: "black", image: "/Spon-Spon-black.png", label: "ดำ" },
            { id: "green", image: "/Spon-Spon-green.png", label: "เขียว" },
            { id: "red", image: "/Spon-Spon-red.png", label: "แดง" },
          ],
        },

      ],
      addons: [
        {
          id: 101,
          name: "หมวกด้านหน้า",
          price: "50 บาท/โหล",
          image: "/hat.png",
        },
        {
          id: 102,
          name: "หูหิ้ว",
          price: "50 บาท/โหล",
          image: "/handle.png",
        },
        {
          id: 103,
          name: "กระดุม",
          price: "50 บาท/โหล",
          image: "/button.png",
        },
      ],
    },
    {
      size: "25x55 นิ้ว",
      products: [
        {
          id: 3,
          name: "เนื้อผ้าใส",
          desc: "สินค้าคุณภาพ วัสดุผลิตจากวัสดุชั้นดี",
          price: "350 บาท/โหล",
          mainImage: "/Pro-2---red.png",
          colors: [
            { id: "red", image: "/Pro-2---red.png", label: "Red" },
            { id: "blue", image: "/Pro-2---blue.png", label: "Blue" },
          ],
        },
        {
          id: 4,
          name: "เนื้อผ้าหนา",
          desc: "สินค้าคุณภาพ วัสดุผลิตจากวัสดุชั้นดี",
          price: "400 บาท/โหล",
          mainImage: "/Pro-2---blue.png",
          colors: [
            { id: "red", image: "/Pro-2---red.png", label: "Red" },
            { id: "blue", image: "/Pro-2---blue.png", label: "Blue" },
          ],
        },
      ],
      addons: [
        {
          id: 104,
          name: "หมวกด้านหน้า",
          price: "50 บาท/โหล",
          image: "/hat.png",
        },
        {
          id: 105,
          name: "หูหิ้ว",
          price: "50 บาท/โหล",
          image: "/handle.png",
        },
        {
          id: 106,
          name: "กระดุม",
          price: "50 บาท/โหล",
          image: "/button.png",
        },
      ],
    },
  ];

  const [selectedImages, setSelectedImages] = useState(
    categories.reduce((acc, category) => {
      category.products.forEach((product) => {
        acc[product.id] = product.mainImage;
      });
      return acc;
    }, {} as Record<number, string>)
  );

  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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

  const handleColorClick = (productId: number, image: string) => {
    setSelectedImages((prev) => ({ ...prev, [productId]: image }));
  };

  return (
    <section className="w-full bg-gray-50 px-4 md:px-10 py-10">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">
          ถุงคลุมชุดสูท
        </h1>
        <p className="text-gray-700 mt-2 text-lg sm:text-xl">
          สินค้าคุณภาพ วัสดุผลิตจากวัสดุชั้นดี
        </p>
      </header>

      {categories.map((category) => (
        <div key={category.size} className="mb-12">
          {/* Accordion มือถือ */}
          {isMobile && (
            <button
              className="w-full flex justify-between items-center  p-4 rounded-md mb-4" style={{ background: "#deb18a" }}
              onClick={() =>
                setOpenCategory(
                  openCategory === category.size ? null : category.size
                )
              }
            >
              <span className="font-semibold text-lg">{category.size}</span>
              <span className="text-xl">
                {openCategory === category.size ? "−" : "+"}
              </span>
            </button>
          )}

          {/* Desktop header */}
          {!isMobile && (
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
              ขนาด {category.size}
            </h2>
          )}

          {/* Container สินค้า */}
          {(!isMobile || openCategory === category.size) && (
            <>
              {/* Main products */}
              <div className="flex flex-wrap -mx-4 mb-6">
                {category.products.map((product) => (
                  <motion.div
                    key={product.id}
                    className="w-full md:w-1/2 px-4 mb-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                  >
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-6 items-center">
                      {/* Product Image */}
                      <div className="w-full md:w-1/2 flex justify-center">
                        <div className="relative w-full sm:max-w-[400px] aspect-[4/5]">
                          <Image
                            src={selectedImages[product.id]}
                            alt={product.name}
                            fill
                            className="object-contain"
                            priority
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-4">
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                          {product.name}
                        </h3>
                        <p className="text-lg sm:text-xl text-gray-700">
                          {product.desc}
                        </p>

                        {/* Colors */}
                        <p className="font-semibold text-gray-800 mt-2">
                          Other colors
                        </p>
                        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                          {product.colors.map((color) => (
                            <div
                              key={color.id}
                              onClick={() =>
                                handleColorClick(product.id, color.image)
                              }
                              className={`relative w-20 h-28 border rounded cursor-pointer overflow-hidden transition
                          ${selectedImages[product.id] === color.image
                                  ? "border-gray-800 shadow-md"
                                  : "border-gray-200 hover:border-gray-400"
                                }`}
                            >
                              <div className="relative w-full h-20">
                                <Image
                                  src={color.image}
                                  alt={color.label}
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

                        {/* Price */}
                        <p className="text-3xl font-bold text-[#deb18a] mt-4">
                          {product.price}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Addon products */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                เพิ่มเติมจุดต่างๆ
              </h3>
              <div className="flex flex-wrap -mx-4">
                {category.addons.map((addon) => (
                  <div
                    key={addon.id}
                    className="w-1/2 md:w-1/4 px-4 mb-6"
                  >
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col items-center gap-2">
                      <div className="relative w-full h-28">
                        <Image
                          src={addon.image}
                          alt={addon.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="text-center font-medium text-gray-700">
                        {addon.name}
                      </p>
                      <p className="text-center font-bold text-[#deb18a]">
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
