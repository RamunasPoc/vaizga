import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Metadata nustatymai PWA ir SEO
export const metadata: Metadata = {
  title: "Vaizga",
  description: "Algos skaičiuoklė",
  manifest: "/manifest.json", 
  icons: {
    icon: "/LOGO.png",
    shortcut: "/LOGO.png",
    apple: "/LOGO.png", 
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Vaizga",
  },
};

// 2. Viewport nustatymai (Užtikrina APP pojūtį ir išjungia nepageidaujamą priartinimą)
export const viewport: Viewport = {
  themeColor: "#ffffff", // Galite pakeisti į #000000, jei naudojate tamsų režimą
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* Vercel Analytics skirta srauto stebėjimui */}
        <Analytics />

        {/* Service Worker registracija. 
          Ji aktyvuoja jūsų public/sw.js failą, kuris leidžia 
          programėlei veikti greičiau ir stabiliau.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('SW registracija sėkminga: ', registration.scope);
                    },
                    function(err) {
                      console.log('SW registracija nepavyko: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}