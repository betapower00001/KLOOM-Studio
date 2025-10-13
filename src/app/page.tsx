// app/page.tsx
import HomeClient from "./HomeClient";

export const metadata = {
  title: "KLOOM Studio – ชุดสั่งตัดเฉพาะตัว",
  description: "บริการตัดชุดสั่งตัดเฉพาะตัว พร้อมคำปรึกษาและการวัดตัวอย่างมืออาชีพ",
  keywords: ["KLOOM Studio", "ชุดสั่งตัด", "KLOOM Studio", "ตัดชุด"],
  openGraph: {
    title: "Tailor Shop – ชุดสั่งตัดเฉพาะตัว",
    description: "บริการตัดชุดสั่งตัดเฉพาะตัว พร้อมคำปรึกษาและการวัดตัวอย่างมืออาชีพ",
    url: "https://www.yourtailorshop.com",
    siteName: "KLOOM Studio",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KLOOM Studio",
    description: "บริการตัดชุดสั่งตัดเฉพาะตัว",
    images: ["/logo.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
