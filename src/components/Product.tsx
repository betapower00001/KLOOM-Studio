"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProductPage() {
  const categories = [
    {
      size: "25x37 นิ้ว",
      products: [
        {
          id: 1,
          name: "พีวีซีใส / พีวีซีใส",
          desc: "ขนาด 25x37 นิ้ว",
          mainImage: "/PVC-Clear-25x37.png",
          colors: [
            { id: "clear", image: "/PVC-Clear-25x37.png", label: "ใส", price: "400 บาท/โหล" },
          ],
        },
        {
          id: 2,
          name: "พีวีซีใส / สปันบอนด์",
          desc: "ขนาด 25x37 นิ้ว",
          mainImage: "/PVC-Spon-white.png",
          colors: [
            { id: "white", image: "/PVC-Spon-white.png", label: "ขาว", price: "400 บาท/โหล" },
            { id: "gray", image: "/PVC-Spon-gray.png", label: "เทา", price: "400 บาท/โหล" },
            { id: "beige", image: "/PVC-Spon-beige.png", label: "เบจ(เนื้อ)", price: "400 บาท/โหล" },
            { id: "brow", image: "/PVC-Spon-brow.png", label: "น้ำตาลช็อคโกแลต", price: "400 บาท/โหล" },
            { id: "blue", image: "/PVC-Spon-blue.png", label: "กรมท่า", price: "400 บาท/โหล" },
            { id: "black", image: "/PVC-Spon-black.png", label: "ดำ", price: "400 บาท/โหล" },
            { id: "green ", image: "/PVC-Spon-green.png", label: "เขียว", price: "400 บาท/โหล" },
            { id: "red", image: "/PVC-Spon-red.png", label: "แดง", price: "400 บาท/โหล" },
          ],
        },
        {
          id: 3,
          name: "สปันบอนด์ / สปันบอนด์",
          desc: "ขนาด 25x37 นิ้ว",
          mainImage: "/Spon-Spon-white.png",
          colors: [
            { id: "white", image: "/Spon-Spon-white.png", label: "ขาว", price: "500 บาท/โหล" },
            { id: "gray", image: "/Spon-Spon-gray.png", label: "เทา", price: "500 บาท/โหล" },
            { id: "beige", image: "/Spon-Spon-beige.png", label: "เบจ(เนื้อ)", price: "500 บาท/โหล" },
            { id: "brow", image: "/Spon-Spon-brow.png", label: "น้ำตาลช็อคโกแลต", price: "500 บาท/โหล" },
            { id: "blue", image: "/Spon-Spon-blue.png", label: "กรมท่า", price: "500 บาท/โหล" },
            { id: "black", image: "/Spon-Spon-black.png", label: "ดำ", price: "500 บาท/โหล" },
            { id: "green", image: "/Spon-Spon-green.png", label: "เขียว", price: "500 บาท/โหล" },
            { id: "red", image: "/Spon-Spon-red.png", label: "แดง", price: "500 บาท/โหล" },
          ],
        },
      ],
      addons: [
        { id: 101, name: "หมวกด้านหน้า", price: "50 บาท/โหล", image: "/Addon-1.png" },
        { id: 102, name: "หูหิ้ว บน-ล่าง", price: "50 บาท/โหล", image: "/Addon-2.png" },
        { id: 103, name: "กระดุม บน-ล่าง", price: "50 บาท/โหล", image: "/Addon-3.png" },
      ],
    },
    {
      size: "25x55 นิ้ว",
      products: [
        {
          id: 4,
          name: "พีวีซีใส / พีวีซีใส",
          desc: "ขนาด 25x55 นิ้ว",
          mainImage: "/PVC-Clear.png",
          colors: [
            { id: "clear", image: "/PVC-Clear.png", label: "ใส", price: "700 บาท/โหล" },
          ],
        },
        {
          id: 5,
          name: "พีวีซีใส / สปันบอนด์",
          desc: "ขนาด 25x55 นิ้ว",
          mainImage: "/PVC-spon25x55-white.png",
          colors: [
            { id: "white", image: "/PVC-spon25x55-white.png", label: "ขาว", price: "700 บาท/โหล" },
            { id: "gray", image: "/PVC-spon25x55-gray.png", label: "เทา", price: "700 บาท/โหล" },
            { id: "beige", image: "/PVC-spon25x55-beige.png", label: "เบจ(เนื้อ)", price: "700 บาท/โหล" },
            { id: "brow", image: "/PVC-spon25x55-brow.png", label: "น้ำตาลช็อคโกแลต", price: "700 บาท/โหล" },
            { id: "blue", image: "/PVC-spon25x55-blue.png", label: "กรมท่า", price: "700 บาท/โหล" },
            { id: "black", image: "/PVC-spon25x55-black.png", label: "ดำ", price: "700 บาท/โหล" },
            { id: "green ", image: "/PVC-spon25x55-green.png", label: "เขียว", price: "700 บาท/โหล" },
            { id: "red", image: "/PVC-spon25x55-red.png", label: "แดง", price: "700 บาท/โหล" },
          ],
        },
        {
          id: 6,
          name: "สปันบอนด์ / สปันบอนด์",
          desc: "ขนาด 25x55 นิ้ว",
          mainImage: "/spon25x55-white.png",
          colors: [
            { id: "white", image: "/spon25x55-white.png", label: "ขาว", price: "900 บาท/โหล" },
            { id: "gray", image: "/spon25x55-gray.png", label: "เทา", price: "900 บาท/โหล" },
            { id: "beige", image: "/spon25x55-beige.png", label: "เบจ(เนื้อ)", price: "900 บาท/โหล" },
            { id: "brow", image: "/spon25x55-brow.png", label: "น้ำตาลช็อคโกแลต", price: "900 บาท/โหล" },
            { id: "blue", image: "/spon25x55-blue.png", label: "กรมท่า", price: "900 บาท/โหล" },
            { id: "black", image: "/spon25x55-black.png", label: "ดำ", price: "900 บาท/โหล" },
            { id: "green", image: "/spon25x55-green.png", label: "เขียว", price: "900 บาท/โหล" },
            { id: "red", image: "/spon25x55-red.png", label: "แดง", price: "900 บาท/โหล" },
          ],
        },
      ],
      addons: [
        { id: 101, name: "หมวกด้านหน้า", price: "50 บาท/โหล", image: "/Addon-1.png" },
        { id: 102, name: "หูหิ้ว บน-ล่าง", price: "50 บาท/โหล", image: "/Addon-2.png" },
        { id: 103, name: "กระดุม บน-ล่าง", price: "50 บาท/โหล", image: "/Addon-3.png" },
      ],
    },
    {
      size: "25x65 นิ้ว",
      products: [
        {
          id: 7,
          name: "พีวีซีใส / พีวีซีใส",
          desc: "ขนาด 25x65 นิ้ว",
          mainImage: "/PVC-Clear-25x65.png",
          colors: [
            { id: "clear", image: "/PVC-Clear-25x65.png", label: "ใส", price: "800 บาท/โหล" },
          ],
        },
        {
          id: 8,
          name: "พีวีซีใส / สปันบอนด์",
          desc: "ขนาด 25x65 นิ้ว",
          mainImage: "/PVCspon-25x65---white.png",
          colors: [
            { id: "white", image: "/PVCspon-25x65---white.png", label: "ขาว", price: "800 บาท/โหล" },
            { id: "gray", image: "/PVCspon-25x65---gray.png", label: "เทา", price: "800 บาท/โหล" },
            { id: "beige", image: "/PVCspon-25x65---beige.png", label: "เบจ(เนื้อ)", price: "800 บาท/โหล" },
            { id: "brow", image: "/PVCspon-25x65---brow.png", label: "น้ำตาลช็อคโกแลต", price: "800 บาท/โหล" },
            { id: "blue", image: "/PVCspon-25x65---blue.png", label: "กรมท่า", price: "800 บาท/โหล" },
            { id: "black", image: "/PVCspon-25x65---black.png", label: "ดำ", price: "800 บาท/โหล" },
            { id: "green", image: "/PVCspon-25x65---green.png", label: "เขียว", price: "800 บาท/โหล" },
            { id: "red", image: "/PVCspon-25x65---red.png", label: "แดง", price: "800 บาท/โหล" },

          ],
        },
        {
          id: 9,
          name: "สปันบอนด์ / สปันบอนด์",
          desc: "ขนาด 25x65 นิ้ว",
          mainImage: "/spon-25x65---white.png",
          colors: [
            { id: "white", image: "/spon-25x65---white.png", label: "ขาว", price: "1,000 บาท/โหล" },
            { id: "gray", image: "/spon-25x65---gray.png", label: "เทา", price: "1,000 บาท/โหล" },
            { id: "beige", image: "/spon-25x65---beige.png", label: "เบจ(เนื้อ)", price: "1,000 บาท/โหล" },
            { id: "brow", image: "/spon-25x65---brow.png", label: "น้ำตาลช็อคโกแลต", price: "1,000 บาท/โหล" },
            { id: "blue", image: "/spon-25x65---blue.png", label: "กรมท่า", price: "1,000 บาท/โหล" },
            { id: "black", image: "/spon-25x65---black.png", label: "ดำ", price: "1,000 บาท/โหล" },
            { id: "green", image: "/spon-25x65---green.png", label: "เขียว", price: "1,000 บาท/โหล" },
            { id: "red", image: "/spon-25x65---red.png", label: "แดง", price: "1,000 บาท/โหล" },
          ],
        },
      ],
      addons: [
        { id: 101, name: "หมวกด้านหน้า", price: "50 บาท/โหล", image: "/Addon-1.png" },
        { id: 102, name: "หูหิ้ว บน-ล่าง", price: "50 บาท/โหล", image: "/Addon-2.png" },
        { id: 103, name: "กระดุม บน-ล่าง", price: "50 บาท/โหล", image: "/Addon-3.png" },
      ],
    },
    {
      size: "25x70 นิ้ว",
      products: [
        {
          id: 7,
          name: "พีวีซีใส / พีวีซีใส",
          desc: "ขนาด 25x70 นิ้ว",
          mainImage: "/PVC-Clear-25x70.png",
          colors: [
            { id: "clear", image: "/PVC-Clear-25x70.png", label: "ใส", price: "900 บาท/โหล" },
          ],
        },
        {
          id: 8,
          name: "พีวีซีใส / สปันบอนด์",
          desc: "ขนาด 25x70 นิ้ว",
          mainImage: "/PVC-Spanpon-25x70-white.png",
          colors: [
            { id: "white", image: "/PVC-Spanpon-25x70-white.png", label: "ขาว", price: "900 บาท/โหล" },
            { id: "gray", image: "/PVC-Spanpon-25x70-gray.png", label: "เทา", price: "900 บาท/โหล" },
            { id: "beige", image: "/PVC-Spanpon-25x70-beige.png", label: "เบจ(เนื้อ)", price: "900 บาท/โหล" },
            { id: "brow", image: "/PVC-Spanpon-25x70-brow.png", label: "น้ำตาลช็อคโกแลต", price: "900 บาท/โหล" },
            { id: "blue", image: "/PVC-Spanpon-25x70-blue.png", label: "กรมท่า", price: "900 บาท/โหล" },
            { id: "black", image: "/PVC-Spanpon-25x70-black.png", label: "ดำ", price: "900 บาท/โหล" },
            { id: "geeen", image: "/PVC-Spanpon-25x70-green.png", label: "เขียว", price: "900 บาท/โหล" },
            { id: "red", image: "/PVC-Spanpon-25x70-red.png", label: "แดง", price: "900 บาท/โหล" },
          ],
        },
        {
          id: 9,
          name: "สปันบอนด์ / สปันบอนด์",
          desc: "ขนาด 25x70 นิ้ว",
          mainImage: "/Spanpon-25x70-white.png",
          colors: [
            { id: "white", image: "/Spanpon-25x70-white.png", label: "ขาว", price: "1,100 บาท/โหล" },
            { id: "gray", image: "/Spanpon-25x70-gray.png", label: "เทา", price: "1,000 บาท/โหล" },
            { id: "beige", image: "/Spanpon-25x70-beige.png", label: "เบจ(เนื้อ)", price: "1,100 บาท/โหล" },
            { id: "brow", image: "/Spanpon-25x70-brow.png", label: "น้ำตาลช็อคโกแลต", price: "1,100 บาท/โหล" },
            { id: "blue", image: "/Spanpon-25x70-blue.png", label: "กรมท่า", price: "1,100 บาท/โหล" },
            { id: "black", image: "/Spanpon-25x70-black.png", label: "ดำ", price: "1,100 บาท/โหล" },
            { id: "green", image: "/Spanpon-25x70-geen.png", label: "เขียว", price: "1,100 บาท/โหล" },
            { id: "red", image: "/Spanpon-25x70-red.png", label: "แดง", price: "1,100 บาท/โหล" },
          ],
        },
      ],
      addons: [
        { id: 101, name: "หมวกด้านหน้า", price: "50 บาท/โหล", image: "/Addon-1.png" },
        { id: 102, name: "หูหิ้ว บน-ล่าง", price: "50 บาท/โหล", image: "/Addon-2.png" },
        { id: 103, name: "กระดุม บน-ล่าง", price: "50 บาท/โหล", image: "/Addon-3.png" },
      ],
    },



  ];

  // เก็บ state ว่า product ไหนเลือกสีไหน พร้อมราคา
  const [selectedVariants, setSelectedVariants] = useState(
    categories.reduce((acc, category) => {
      category.products.forEach((product) => {
        const defaultColor = product.colors[0];
        acc[product.id] = { image: defaultColor.image, price: defaultColor.price };
      });
      return acc;
    }, {} as Record<number, { image: string; price: string }>)
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

  const handleColorClick = (productId: number, image: string, price: string) => {
    setSelectedVariants((prev) => ({ ...prev, [productId]: { image, price } }));
  };

  return (
    <section id="Product" className="w-full bg-gray-50 px-4 md:px-10 py-10">
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
          {isMobile && (
            <button
              className="w-full flex justify-between items-center p-4 rounded-md mb-4"
              style={{ background: "#deb18a" }}
              onClick={() =>
                setOpenCategory(openCategory === category.size ? null : category.size)
              }
            >
              <span className="font-semibold text-lg">{category.size}</span>
              <span className="text-xl">
                {openCategory === category.size ? "−" : "+"}
              </span>
            </button>
          )}

          {!isMobile && (
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
              ขนาด {category.size}
            </h2>
          )}

          {(!isMobile || openCategory === category.size) && (
            <>
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
                            src={selectedVariants[product.id].image}
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

                        <p className="font-semibold text-gray-800 mt-2">
                          Other colors
                        </p>
                        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                          {product.colors.map((color) => (
                            <div
                              key={color.id}
                              onClick={() =>
                                handleColorClick(product.id, color.image, color.price)
                              }
                              className={`relative w-20 h-28 border rounded cursor-pointer overflow-hidden transition
                                ${selectedVariants[product.id].image === color.image
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

                        <p className="text-3xl font-bold text-[#deb18a] mt-4">
                          {selectedVariants[product.id].price}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                เพิ่มเติมจุดต่างๆ
              </h3>
              <div className="flex flex-wrap -mx-4">
                {category.addons.map((addon) => (
                  <div key={addon.id} className="w-1/2 md:w-1/4 px-4 mb-6">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col items-center gap-2">
                      <div className="relative w-full h-28">
                        <Image
                          src={addon.image}
                          alt={addon.name}
                          fill
                          className="object-contain"
                        />
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
