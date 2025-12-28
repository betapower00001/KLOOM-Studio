import Link from "next/link";
import Image from "next/image";

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "เรียบหรู",
      desc: "ออกแบบและพัฒนาเว็บไซต์สั่งตัดสูทเฉพาะบุคคลด้วยดีไซน์เรียบหรู",
      img: "/EX-1.jpg",
    },
    {
      id: 2,
      title: "นำชันแฟชั่น",
      desc: "ดีไซน์เว็บไซต์นำเสนอคอลเลกชันเสื้อผ้าแฟชั่นในสไตล์โมเดิร์น",
      img: "/EX-2.jpg",
    },
    {
      id: 3,
      title: "ดีไซน์เป็นเอกลักษณ์",
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
              className="bg-white shadow-lg rounded-2xl overflow-hidden
                         hover:shadow-2xl transition-all duration-300"
            >
              {/* รูป — คลิกไปหน้ารีวิว */}
              <Link href={`/review/${item.id}`} className="block">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover cursor-pointer
                             transition-transform duration-300 hover:scale-105"
                />
              </Link>

              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-[#454456] mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm mb-6">
                  {item.desc}
                </p>

                {/* ปุ่ม (เผื่อคนชิน UX) */}
                <Link
                  href={`/review/${item.id}`}
                  className="inline-block px-6 py-2 rounded-full
                             border border-[#454456] text-[#454456]
                             hover:bg-[#454456] hover:text-white
                             transition-all duration-300 text-sm font-medium"
                >
                  ดูรีวิว
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
