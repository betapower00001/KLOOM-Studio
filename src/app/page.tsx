// app/page.tsx
import HomeClient from "./HomeClient";

export const metadata = {
  title: "Tailor Shop – ชุดสั่งตัดเฉพาะตัว",
  description: "บริการตัดชุดสั่งตัดเฉพาะตัว พร้อมคำปรึกษาและการวัดตัวอย่างมืออาชีพ",
  keywords: ["Tailor", "ชุดสั่งตัด", "Tailor Shop", "ตัดชุด"],
  openGraph: {
    title: "Tailor Shop – ชุดสั่งตัดเฉพาะตัว",
    description: "บริการตัดชุดสั่งตัดเฉพาะตัว พร้อมคำปรึกษาและการวัดตัวอย่างมืออาชีพ",
    url: "https://www.yourtailorshop.com",
    siteName: "Tailor Shop",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tailor Shop",
    description: "บริการตัดชุดสั่งตัดเฉพาะตัว",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
