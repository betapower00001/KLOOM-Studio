import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative h-[90vh] flex items-center justify-center bg-[url('/image-1.jpg')] bg-cover bg-center overflow-hidden"
    >
      {/* Layer มืดครึ่งโปร่ง */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* คอนเทนต์ตรงกลาง */}
      <div className="relative z-10 text-center text-white px-4">
        <h1
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg animate-fadeInDown"
        >
          เพราะสไตล์ของคุณ…ไม่เหมือนใคร
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8 animate-fadeInUp">
          เราพร้อมออกแบบลุคในแบบที่เป็นตัวคุณ
        </p>

        <Link href="#Product" scroll={true}>
          <button className="px-8 py-3 bg-white text-black font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#deb18a] hover:text-white animate-fadeInUp">
            Discover More
          </button>
        </Link>
      </div>

      {/* เอฟเฟกต์ overlay แสงเบา ๆ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      {/* เพิ่ม motion animation ด้วย tailwind keyframes */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 1s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1.2s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
