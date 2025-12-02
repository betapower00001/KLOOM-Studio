"use client";
import { useEffect } from "react";

export default function TelPage() {
  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-11510571691/z_7cCK7UvIYaEKvF1fAq",
      });
    }
    window.location.href = "tel:0886424699";
  }, []);

  return <p>กำลังโทรออก...</p>;
}
