"use client";
import { useEffect } from "react";

export default function LinePage() {
  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-11510571691/UQA-CKvUvIYaEKvF1fAq",
      });
    }
    window.location.href = "https://line.me/ti/p/~@kloomstudio";
  }, []);

  return <p>กำลังพาคุณไปยัง LINE...</p>;
}
