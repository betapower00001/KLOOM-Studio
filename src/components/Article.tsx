export default function Article() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#f9f7f3] to-[#e9e4dc] text-gray-900">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-14">
        
        {/* รูปภาพด้านซ้าย */}
        <div className="md:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent rounded-3xl"></div>
          <img
            src="/Picblog-1.jpg"
            alt="ถุงคลุมชุดพร้อมโลโก้"
            className="w-full rounded-3xl shadow-2xl object-cover"
          />
        </div>

        {/* เนื้อหาด้านขวา */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-semibold mb-6 text-center md:text-left tracking-wide text-[#2b2b2b]">
            ทำไมห้องเสื้อควรใช้ถุงคลุมชุดพร้อมสกรีนโลโก้
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-10">
            ในอุตสาหกรรมแฟชั่นระดับพรีเมียม รายละเอียดเล็ก ๆ
            คือสิ่งที่สร้างความแตกต่าง ห้องเสื้อและร้านตัดเย็บชั้นนำจึงนิยมใช้
            <strong className="text-[#b79c6d]">
              {" "}
              ถุงคลุมชุดพร้อมสกรีนโลโก้{" "}
            </strong>
            เพื่อยกระดับภาพลักษณ์ของแบรนด์ให้ดูหรูหรา
            สะท้อนความใส่ใจในคุณภาพและความเป็นเอกลักษณ์ในทุกขั้นตอน
          </p>

          <div className="text-center md:text-left">
            <a
              href="/blogs/luxury-dress-cover"
              className="inline-block px-8 py-3 bg-[#2b2b2b] text-white rounded-full hover:bg-[#b79c6d] hover:text-white transition-all duration-300 shadow-md"
            >
              อ่านเพิ่มเติม
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
