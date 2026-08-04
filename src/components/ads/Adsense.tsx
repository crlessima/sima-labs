"use client";
import { useEffect, useState } from "react";

export default function Adsense() {
  const [loaded, setLoaded] = useState(false);
  declare global {
    interface Window {
      adsbygoogle: any[];
    }
  }

  useEffect(() => {
    if (!loaded) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setLoaded(true);
      } catch (e) {}
    }
  }, [loaded]);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", margin: "20px 0" }}
      data-ad-client="ca-pub-3116341116644314"
      data-ad-slot="6865347702"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
