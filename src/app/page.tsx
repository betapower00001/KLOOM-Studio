// app/page.tsx
import HomeClient from "./HomeClient";

export const metadata = {
  title: "KLOOM Studio – บริการตัดชุดคลุมสูทสั่งตัดเฉพาะตัว พร้อมคำปรึกษาและการวัดตัวอย่างมืออาชีพ",
  description: "บริการตัดชุดคลุมสูทสั่งตัดเฉพาะตัว พร้อมคำปรึกษาและการวัดตัวอย่างมืออาชีพ",
  keywords: ["ถุงคลุมชุดสูท", "ถุงคลุมชุดไทย", "ถุงคลุมชุดราตรี", "ถุงคลุมสูทพร้อมสกรีน", "ถุงคลุมชุดพร้อมโลโก้", "ถุงคลุมชุดขายส่ง", "ถุงคลุมชุดรับผลิต", "ถุงคลุมชุดโรงงาน", "garment bag suit cover" , "suit garment bag with logo", "Kloomsuit", "Kloomstudio", "ถุงคลุมชุดคละขนาด", "ถุงคลุมชุดคุณภาพ", "ถุงคลุมชุดวัสดุสปันบอนด์", "ถุงคลุมชุดวัสดุPVCใส", "ถุงคลุมชุดเพิ่มมูลค่าร้าน", "ถุงคลุมชุดดีไซน์เฉพาะแบรนด์", "ถุงคลุมชุดผลิตเร็วส่งทั่วประเทศ", "ถุงคลุมชุดสำหรับร้านเช่าชุด", "ถุงคลุมชุดสำหรับร้านตัดสูท", "สกรีนโลโก้บนถุงคลุมชุด"],
  openGraph: {
    title: "KLOOM Studio – ชุดสั่งตัดเฉพาะตัว",
    description: "บริการตัดชุดคลุมสูทสั่งตัดเฉพาะตัว พร้อมคำปรึกษาและการวัดตัวอย่างมืออาชีพ",
    url: "https://www.kloomsuit.com/",
    siteName: "KLOOM Studio",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KLOOM Studio",
    description: "บริการตัดชุดคลุมสูทสั่งตัดเฉพาะตัว พร้อมคำปรึกษาและการวัดตัวอย่างมืออาชีพ",
    images: ["/logo.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
