export default function Stats() {
  return (
    <section className="w-full bg-[#deb18a] py-16">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6 text-center">
        <div>
          <h3 className="text-4xl font-bold ">100+</h3>
          <p className="text-white-700">จัดส่งชุดแล้ว</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">10+</h3>
          <p className="text-white-700">ปีแห่งประสบการณ์</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">5+</h3>
          <p className="text-white-700">ช่างตัดเสื้อผู้เชี่ยวชาญ</p>
        </div>
      </div>
    </section>
  );
}
