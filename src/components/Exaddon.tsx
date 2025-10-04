export default function Team() {
  return (
    <section className="py-16 container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-10">ฟังก์ชันเสริมที่เลือกได้</h2>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {/* Box 1 */}
        <div className="p-6 bg-white shadow rounded-lg">
          <img
            src="/AddonEx-1.png"   // ใส่ชื่อไฟล์ของคุณเอง
            alt="หูหิ้ว"
            className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
          />
          <h3 className="text-xl font-semibold">เพิ่มหูหิ้ว</h3>
          <p className="text-gray-600">ตัวเลือกเสริม</p>
        </div>

        {/* Box 2 */}
        <div className="p-6 bg-white shadow rounded-lg">
          <img
            src="/team2.jpg"   // เปลี่ยนเป็นไฟล์อื่นที่คุณใส่ไว้
            alt="กระดุม"
            className="w-32 h-32 mx-auto mb-4 object-cover"
          />
          <h3 className="text-xl font-semibold">เพิ่มกระดุม</h3>
          <p className="text-gray-600">ตัวเลือกเสริม</p>
        </div>

        {/* Box 3 */}
        <div className="p-6 bg-white shadow rounded-lg">
          <img
            src="/team3.jpg"
            alt="อื่นๆ"
            className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
          />
          <h3 className="text-xl font-semibold">ฟังก์ชันอื่นๆ</h3>
          <p className="text-gray-600">เพิ่มเติมตามต้องการ</p>
        </div>
      </div>
    </section>
  );
}
