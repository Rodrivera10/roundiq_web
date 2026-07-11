import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { SITE_URL } from "@/app/lib/site";
import "./globals.css";

// Bebas Neue — para títulos impactantes
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

// Inter — para cuerpo de texto, legible y moderno
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const TITULO = "RoundIQ — Entrena con inteligencia";
const DESCRIPCION =
  "La primera banda con cámara POV e IA para artes marciales. Analiza tu sparring. Mejora cada round.";

export const metadata: Metadata = {
  // metadataBase permite que Next resuelva la ruta relativa de la imagen OG
  // a una URL absoluta — obligatorio para que WhatsApp/X muestren el preview.
  metadataBase: new URL(SITE_URL),
  title: TITULO,
  description: DESCRIPCION,
  applicationName: "RoundIQ",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "RoundIQ",
    title: TITULO,
    description: DESCRIPCION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RoundIQ — IA para artes marciales y deportes de combate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
    <html lang="es">
      <body
        className={`${bebasNeue.variable} ${inter.variable} font-inter bg-[#0a0a0a] antialiased`}
        // Esto le dice al navegador que siempre empiece desde arriba
        // Es como decirle "no recuerdes dónde estaba el usuario antes"
        style={{ scrollBehavior: 'smooth' }}
      >
        {children}
      </body>
    </html>
  );
}