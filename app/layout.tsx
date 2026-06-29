import type { Metadata, Viewport } from "next";
import { Anton, Archivo } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edegang.vercel.app"),
  title: "EDE GANG — Oski & Zuhruf | Kahramanmaraş",
  description:
    "EDE GANG. İki isim, tek ses: Oski & Zuhruf. Kahramanmaraş yeraltı rap. Yeni single, klipler ve sosyal medya tek noktada.",
  keywords: ["EDE GANG", "edegang", "Oski", "Zuhruf", "rap", "hip-hop", "Kahramanmaraş", "Türkçe rap"],
  openGraph: {
    title: "EDE GANG — Oski & Zuhruf",
    description: "Kahramanmaraş yeraltı rap topluluğu. İki isim, tek ses.",
    type: "website",
    images: ["/img/duo.jpg"],
  },
  icons: {
    icon: "/img/neon.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${anton.variable} ${archivo.variable}`}>{children}</body>
    </html>
  );
}
