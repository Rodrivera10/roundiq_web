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
  keywords: [
    "RoundIQ",
    "análisis de combate con IA",
    "MMA",
    "boxeo",
    "artes marciales",
    "cámara POV",
    "análisis de sparring",
    "tecnología deportiva",
  ],
  authors: [{ name: "IKBATECH" }],
  creator: "IKBATECH",
  publisher: "IKBATECH",
  alternates: { canonical: "/" },
  // Le dice a Google que indexe todo y muestre previews completos
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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

// ── Datos estructurados (JSON-LD) ──
// Le explica a Google, en su idioma, que RoundIQ es una marca real: quién la hace,
// cuál es su web oficial y sus redes. Es lo que ayuda a distinguirnos de los otros
// "RoundIQ" que ya existen y, con el tiempo, a ganar el panel de marca.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organizacion`,
      name: "RoundIQ",
      legalName: "IKBATECH",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-roundiq.png`,
      description: DESCRIPCION,
      foundingLocation: {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressCountry: "GT" },
      },
      sameAs: [
        "https://www.instagram.com/roundiq/",
        "https://www.tiktok.com/@roundiq.app",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#sitio`,
      url: SITE_URL,
      name: "RoundIQ",
      description: DESCRIPCION,
      inLanguage: "es",
      publisher: { "@id": `${SITE_URL}/#organizacion` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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