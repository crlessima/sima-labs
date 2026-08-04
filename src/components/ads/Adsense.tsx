"use client";
import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Erro ao carregar AdSense:", err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center", margin: "20px 0" }}
      data-ad-client="ca-pub-3116341116644314"
      data-ad-slot="6865347702"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}