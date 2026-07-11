"use client";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

// Links de navegación — se usan en desktop y en el menú móvil
const LINKS = [
  { label: "App", href: "#app" },
  { label: "Membresías", href: "#membresias" },
  { label: "Visión", href: "#vision" },
  { label: "IQ POV", href: "#como-funciona" },
];

export default function Navbar() {
  // Detecta si el usuario hizo scroll — cambia el estilo del navbar
  const [scrolled, setScrolled] = useState(false);
  // Controla si el menú móvil está abierto
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuAbierto
          ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">

        {/* LOGO */}
        <a
          href="/"
          onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMenuAbierto(false); }}
          className="flex items-center group"
        >
          <Image
            src="/logo-roundiq.png"
            alt="roundIQ"
            width={638}
            height={129}
            priority
            className="h-6 w-auto transition-opacity duration-300 group-hover:opacity-80"
          />
        </a>

        {/* DERECHA — links + CTA (desktop) */}
        <div className="flex items-center gap-6 md:gap-8">

          {/* Links — solo desktop */}
          <div className="hidden md:flex items-center gap-6">
            {LINKS.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="relative text-[10px] text-white/30 hover:text-white/70 tracking-[0.25em] uppercase transition-colors duration-200 flex flex-col items-center gap-1"
              >
                {link.label}
                <motion.span
                  variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#e63329]/60"
                  style={{ originX: 0 }}
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Waitlist — visible siempre */}
          <a
            href="#waitlist"
            onClick={() => setMenuAbierto(false)}
            className="relative hidden sm:flex items-center gap-2.5 border border-white/10 hover:border-[#e63329]/40 px-4 py-2 transition-colors duration-300 group"
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e63329] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#e63329]" />
            </span>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/70 group-hover:text-white transition-colors duration-200">
              Waitlist
            </span>
          </a>

          {/* BOTÓN HAMBURGUESA — solo móvil */}
          <button
            onClick={() => setMenuAbierto((v) => !v)}
            className="md:hidden relative w-7 h-7 flex items-center justify-center"
            aria-label="Abrir menú"
          >
            {/* Dos líneas que se transforman en X al abrir */}
            <motion.span
              animate={menuAbierto ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              className="absolute w-6 h-px bg-white"
            />
            <motion.span
              animate={menuAbierto ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              className="absolute w-6 h-px bg-white"
            />
          </button>
        </div>
      </div>

      {/* ── MENÚ MÓVIL DESPLEGABLE ── */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-white/[0.06] bg-[#0a0a0a]/95 backdrop-blur-xl"
          >
            <div className="px-6 py-6 flex flex-col">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuAbierto(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                  className="flex items-center justify-between py-4 border-b border-white/[0.05] group"
                >
                  <span className="font-bebas text-2xl text-white/70 group-hover:text-white tracking-[0.05em] transition-colors">
                    {link.label}
                  </span>
                  <span className="text-[#e63329] text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    →
                  </span>
                </motion.a>
              ))}

              {/* CTA Waitlist dentro del menú */}
              <motion.a
                href="#waitlist"
                onClick={() => setMenuAbierto(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + LINKS.length * 0.06 }}
                className="mt-6 flex items-center justify-center gap-2.5 bg-[#e63329] py-4 group"
              >
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                </span>
                <span className="text-[11px] font-black tracking-[0.3em] uppercase text-white">
                  Unirme al Waitlist
                </span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
