"use client";

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

import { useEffect, useState } from "react";

export default function Adsense() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                setLoaded(true);
            } catch (err) {
                console.error("Erro ao carregar AdSense:", err);
            }
        }
    }, [loaded]);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block", margin: "20px 0" }}
            data-ad-client="ca-pub-3116431116643414"
            data-ad-slot="6635477072"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    );
}
