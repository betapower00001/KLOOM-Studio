"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "เกี่ยวกับ", href: "#about" },
    { name: "บริการ", href: "#Services" },
    { name: "ฟงชั่นเสริม", href: "#Exaddon" },
    { name: "สินค้า", href: "#Product" },
    { name: "ติดต่อ", href: "#Footer" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Keyframes animation */}
      <style jsx>{`
        @keyframes fadeSlideDown {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .fade-slide {
          animation: fadeSlideDown 0.5s ease forwards;
        }
        
      `}</style>

      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
            ? "py-3 bg-white/95 backdrop-blur-md shadow-xl fade-slide"
            : "py-5 bg-white shadow-md"
          }`}
      >
        <nav className="container mx-auto px-6 flex items-center fc-font">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Kloom Studio"
              width={120}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Desktop menu */}
          <div
            className={`hidden md:flex items-center gap-8 font-medium ${scrolled ? "ml-auto" : "ml-12"
              } fc-font`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#deb18a] after:transition-all after:duration-300 hover:text-[#deb18a] hover:after:w-full"
                style={{ color: "#454456" }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Book Now (เฉพาะตอนยังไม่ scroll) */}
          {!scrolled && (
            <Link
              href="#book"
              className="hidden md:block ml-auto px-5 py-2 rounded-lg shadow transition-all duration-300 hover:bg-[#c69a70] fc-font"
              style={{ backgroundColor: "#deb18a", color: "#fff" }}
            >
              ติดต่อเรา
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden ml-auto"
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: "#454456" }}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg border-t fc-font">
            <ul className="flex flex-col items-center gap-6 py-6 font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200 hover:text-[#deb18a]"
                    onClick={() => setIsOpen(false)}
                    style={{ color: "#454456" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="w-full">
                <Link
                  href="#book"
                  className="block text-center px-5 py-2 rounded-lg shadow transition duration-200 hover:bg-[#c69a70]"
                  style={{ backgroundColor: "#deb18a", color: "#fff" }}
                  onClick={() => setIsOpen(false)}
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
