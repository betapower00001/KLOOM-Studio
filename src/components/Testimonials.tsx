export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-500 mb-12">
          เพราะทุกคำพูดมีคุณค่า
        </h2>

        {/* Testimonial */}
        <div className="max-w-4xl mx-auto">
          <span className="text-6xl md:text-7xl text-gray-400 align-top">“</span>
          <p className="italic text-2xl md:text-3xl text-gray-800 leading-relaxed inline-block mx-2">
            KLOOM Studio — เติมเต็มความเนี๊ยบให้ทุกการแต่งตัว
          </p>
          <span className="text-6xl md:text-7xl text-gray-400 align-bottom">”</span>
        </div>
      </div>
    </section>

  );
}
