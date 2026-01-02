import type { NextConfig } from "next";

// PWA nustatymai
const withPWA = require("next-pwa")({
  dest: "public",         // Kur dėti sugeneruotus failus
  register: true,         // Ar automatiškai registruoti service worker
  skipWaiting: true,      // Ar atnaujinti app iškart, kai yra nauja versija
  disable: process.env.NODE_ENV === "development", // Išjungiame dev režime, kad neerzintų cache
});

const nextConfig: NextConfig = {
  // Čia gali būti tavo kiti nustatymai, pvz., images domains ir t.t.
};

// Apgaubiame konfigūraciją su withPWA
export default withPWA(nextConfig);