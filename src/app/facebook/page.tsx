"use client";
import { useEffect } from "react";

export default function FacebookPage() {
  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-11510571691/wXIVCLHUvIYaEKvF1fAq",
      });
    }
    window.location.href = "https://www.facebook.com/people/%E0%B8%96%E0%B8%B8%E0%B8%87%E0%B8%84%E0%B8%A5%E0%B8%B8%E0%B8%A1%E0%B8%8A%E0%B8%B8%E0%B8%94%E0%B8%AA%E0%B8%B9%E0%B8%97-%E0%B9%84%E0%B8%97%E0%B8%A2-%E0%B8%A3%E0%B8%B2%E0%B8%95%E0%B8%A3%E0%B8%B5-KLOOM-Studio/61577163384916";
  }, []);

  return <p>กำลังไปยัง Facebook...</p>;
}
