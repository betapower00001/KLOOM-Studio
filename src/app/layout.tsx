import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kloomsuit.com/"), 
  title: "KLOOM Studio – บริการตัดชุดคลุมสูทสั่งตัดเฉพาะตัว พร้อมคำปรึกษาและการวัดตัวอย่างมืออาชีพ",
  description: "บริการตัดชุดคลุมสูทสั่งตัดเฉพาะตัว พร้อมคำปรึกษาและการวัดตัวอย่างมืออาชีพ",
  keywords: ["ถุงคลุมชุดสูท", "ถุงคลุมชุดไทย", "ถุงคลุมชุดราตรี", "ถุงคลุมสูทพร้อมสกรีน", "ถุงคลุมชุดพร้อมโลโก้", "ถุงคลุมชุดขายส่ง", "ถุงคลุมชุดรับผลิต", "ถุงคลุมชุดโรงงาน", "garment bag suit cover" , "suit garment bag with logo", "Kloomsuit", "Kloomstudio", "ถุงคลุมชุดคละขนาด", "ถุงคลุมชุดคุณภาพ", "ถุงคลุมชุดวัสดุสปันบอนด์", "ถุงคลุมชุดวัสดุPVCใส", "ถุงคลุมชุดเพิ่มมูลค่าร้าน", "ถุงคลุมชุดดีไซน์เฉพาะแบรนด์", "ถุงคลุมชุดผลิตเร็วส่งทั่วประเทศ", "ถุงคลุมชุดสำหรับร้านเช่าชุด", "ถุงคลุมชุดสำหรับร้านตัดสูท", "สกรีนโลโก้บนถุงคลุมชุด"],
  authors: [{ name: "KLOOM Studio" }],
  openGraph: {
    title: "KLOOM Studio – ชุดสั่งตัดเฉพาะตัว",
    description: "บริการตัดชุดคลุมสูทสั่งตัดเฉพาะตัว พร้อมคำปรึกษาและการวัดตัวอย่างมืออาชีพ",
    url: "https://www.kloomsuit.com/",
    siteName: "KLOOM Studio",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
      },
    ],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        {/* เพิ่ม meta tags ที่สำคัญ */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="KLOOM Studio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* JSON-LD สำหรับ LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://www.kloomsuit.com/",
              "@type": "LocalBusiness",
              name: "KLOOM Studio",
              image: "https://www.kloomsuit.com/",
              address: {
                "@type": "PostalAddress",
                streetAddress: "215 เพชรเกษม 28 แยก 22 เขตภาษีเจริญ",
                addressLocality: "กรุงเทพฯ",
                postalCode: "10160",
                addressCountry: "TH",
              },
              telephone: "088-642-4699",
              url: "https://www.kloomsuit.com/",
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
