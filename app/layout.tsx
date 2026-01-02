import type { Metadata, Viewport } from "next"; // Pridėtas Viewport
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Pridedame PWA nustatymus į metadata
export const metadata: Metadata = {
  title: "Vaizga",
  description: "Algos skaičiuoklė vairuotojams",
  // Nurodome kelią iki manifest failo (jį sukursime 2 žingsnyje)
  manifest: "/manifest.json", 
  icons: {
    icon: "/LOGO.png",
    shortcut: "/LOGO.png",
    apple: "/LOGO.png", // Šita ikona bus naudojama ant iPhone ekrano
  },
  // iOS specifiniai nustatymai, kad atsidarytų kaip APP
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Vaizga",
    // startupImage: [] // Galima pridėti vėliau
  },
};

// 2. Rekomenduojama: Užfiksuoti mastelį, kad atrodytų kaip native app (neleisti zoominti)
export const viewport: Viewport = {
  themeColor: "#ffffff", // Pakeisk į savo app spalvą
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Neleidžia vartotojui "zoominti" (geriau atrodo kaip app)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}