import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kloomsuit.com/"),
  title:
    "KLOOM Studio – บริการตัดชุดคลุมสูทสั่งตัดเฉพาะตัว พร้อมคำปรึกษาและการวัดตัวอย่างมืออาชีพ",
  description:
    "บริการตัดชุดคลุมสูทสั่งตัดเฉพาะตัว พร้อมคำปรึกษาและการวัดตัวอย่างมืออาชีพ",
  keywords: [
    "ถุงคลุมชุดสูท",
    "ถุงคลุมชุดไทย",
    "ถุงคลุมชุดราตรี",
    "ถุงคลุมสูทพร้อมสกรีน",
    "ถุงคลุมชุดพร้อมโลโก้",
    "ถุงคลุมชุดขายส่ง",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="KLOOM Studio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* JSON-LD */}
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

        {/* Google Tag (ต้องใช้ next/script) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11510571691"
          strategy="afterInteractive"
        />

        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11510571691');
          `}
        </Script>
      </head>

      <body className="font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
