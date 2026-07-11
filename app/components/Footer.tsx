"use client";
import { motion } from "framer-motion";
import Image from "next/image";

// ── Columnas de navegación ──
// Reutilizamos los mismos anchors que ya existen en el Navbar y las secciones.
// Si más adelante agregas una sección nueva, solo añades el link aquí.
const COLUMNAS = [
  {
    titulo: "Producto",
    links: [
      { label: "Cómo funciona", href: "#como-funciona" },
      { label: "El dispositivo", href: "#vision" },
      { label: "Membresías", href: "#membresias" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    titulo: "Empieza",
    links: [
      { label: "Únete al waitlist", href: "#waitlist" },
      { label: "Contacto", href: "mailto:hola@roundiq.com" },
    ],
  },
];

// ── Redes sociales ──
const REDES = [
  { label: "Twitter / X", href: "https://x.com/ikbatech?s=11" },
  { label: "Instagram", href: "https://www.instagram.com/roundiq/" },
  { label: "TikTok", href: "https://www.tiktok.com/@roundiq.app" },
];

export default function Footer() {
  // Año dinámico: nunca queda desactualizado.
  const anio = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/[0.06] px-6 md:px-12 lg:px-20 pt-20 pb-10 overflow-hidden">
      {/* Glow rojo sutil de fondo, igual concepto que en WaitlistSection */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#e63329]/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── BLOQUE 1: marca + columnas ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Marca + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            {/* Mismo logo que el Navbar para mantener consistencia */}
            <a href="#" className="inline-flex items-center group mb-5">
              <Image
                src="/logo-roundiq.png"
                alt="roundIQ"
                width={638}
                height={129}
                className="h-9 w-auto transition-opacity duration-300 group-hover:opacity-80"
              />
            </a>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              Análisis de rendimiento con IA para artes marciales. Graba, analiza
              y mejora — todo en menos de 5 minutos.
            </p>

            {/* Status tech tipo HUD */}
            <div className="inline-flex items-center gap-2.5 mt-6 border border-white/[0.07] px-3 py-2">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e63329] opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#e63329]" />
              </span>
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/40">
                Building · Lanzamiento Q2 2026
              </span>
            </div>
          </motion.div>

          {/* Columnas de links */}
          {COLUMNAS.map((col, i) => (
            <motion.div
              key={col.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="md:col-span-3"
            >
              <h4 className="text-white/30 text-[9px] font-bold tracking-[0.4em] uppercase mb-5">
                {col.titulo}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Redes sociales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-1 md:col-start-12"
          >
            <h4 className="text-white/30 text-[9px] font-bold tracking-[0.4em] uppercase mb-5 whitespace-nowrap">
              Síguenos
            </h4>
            <ul className="flex flex-col gap-3">
              {REDES.map((red) => (
                <li key={red.label}>
                  <a
                    href={red.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-[#e63329] text-sm transition-colors duration-200 whitespace-nowrap"
                  >
                    {red.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── BLOQUE 2: título grande de cierre ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-white/[0.06] pt-10 mb-10"
        >
          <h2 className="font-bebas text-5xl md:text-7xl lg:text-8xl text-white/[0.06] tracking-[0.05em] leading-none select-none">
            ENTRENA INTELIGENTE
          </h2>
        </motion.div>

        {/* ── BLOQUE 3: barra inferior ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <p className="text-white/25 text-[11px] tracking-wider">
            © {anio} RoundIQ. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/25 hover:text-white/50 text-[11px] tracking-wider transition-colors">
              Privacidad
            </a>
            <a href="#" className="text-white/25 hover:text-white/50 text-[11px] tracking-wider transition-colors">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
