import type { NextConfig } from "next";

// ── Content Security Policy ──
// Pragmática: Next.js inyecta scripts/estilos inline para hidratar, por eso
// 'unsafe-inline' es necesario (sin nonces no arranca). Aun así bloqueamos
// scripts externos, restringimos conexiones a nuestro dominio + Supabase,
// e impedimos que el sitio sea embebido en iframes ajenos (clickjacking).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  // Fuerza HTTPS por 2 años (el TLD .app ya exige HTTPS por HSTS preload)
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Anti-clickjacking (refuerza frame-ancestors para navegadores viejos)
  { key: 'X-Frame-Options', value: 'DENY' },
  // Evita que el navegador "adivine" tipos MIME (anti MIME-sniffing)
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // No filtrar la URL completa como referer a sitios externos
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Desactiva APIs sensibles que el sitio no usa
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
]

const nextConfig: NextConfig = {
  // Oculta la cabecera "X-Powered-By: Next.js" (menos huella para atacantes)
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Aplica las cabeceras a todas las rutas
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig;
