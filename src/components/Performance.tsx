export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "เว็บไซต์ร้านตัดสูทหรู",
      desc: "ออกแบบและพัฒนาเว็บไซต์สั่งตัดสูทเฉพาะบุคคลด้วยดีไซน์เรียบหรู",
      img: "/EX-1.jpg",
    },
    {
      id: 2,
      title: "เว็บโชว์คอลเลกชันแฟชั่น",
      desc: "ดีไซน์เว็บไซต์นำเสนอคอลเลกชันเสื้อผ้าแฟชั่นในสไตล์โมเดิร์น",
      img: "/EX-2.jpg",
    },
    {
      id: 3,
      title: "เว็บแสดงผลงานออกแบบ",
      desc: "จัดทำเว็บไซต์พอร์ตโฟลิโอสำหรับดีไซเนอร์พร้อมระบบแกลเลอรี",
      img: "/EX-3.jpg",
    },
  ];

  return (
    <section className="py-20 bg-[#f9f9f9]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#454456]">
          ตัวอย่างผลงานของเรา
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-[#454456] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{item.desc}</p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
