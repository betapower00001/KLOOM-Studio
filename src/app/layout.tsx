import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yourtailorshop.com"), // ✅ ใส่ domain จริงของคุณ
  title: "Tailor Shop – ชุดสั่งตัดเฉพาะตัว",
  description: "บริการตัดชุดสั่งตัดเฉพาะตัว พร้อมคำปรึกษาและการวัดตัวอย่างมืออาชีพ",
  keywords: ["Tailor", "ชุดสั่งตัด", "Tailor Shop", "ตัดชุด"],
  authors: [{ name: "Tailor Shop" }],
  openGraph: {
    title: "Tailor Shop – ชุดสั่งตัดเฉพาะตัว",
    description: "บริการตัดชุดสั่งตัดเฉพาะตัว พร้อมคำปรึกษาและการวัดตัวอย่างมืออาชีพ",
    url: "https://www.yourtailorshop.com",
    siteName: "Tailor Shop",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
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
