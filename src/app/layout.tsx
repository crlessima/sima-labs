import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Sima Labs",
  description: "Plataforma modular Sima Labs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3116341116644314"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>

      <body className="bg-slate-50 text-slate-900">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
