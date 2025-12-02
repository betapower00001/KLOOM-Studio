"use client";
import { useEffect } from "react";

export default function ShopeePage() {
  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-11510571691/F9tWCLfUvIYaEKvF1fAq",
      });
    }
    window.location.href = "https://shopee.co.th/gowgalz";
  }, []);

  return <p>กำลังไปยัง Shopee...</p>;
}
