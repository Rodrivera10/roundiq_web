"use client";

import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { pre: "", val: 500, post: "M+", label: "Practicantes mundiales", sub: "de artes marciales", barra: 90, codigo: "MKT_01" },
  { pre: "$", val: 22, post: "B", label: "Mercado fitness tech", sub: "proyectado 2026", barra: 70, codigo: "MKT_02" },
  { pre: "", val: 0, post: "", label: "Plataformas IA", sub: "dedicadas al combate", barra: 4, codigo: "MKT_03" },
];

const expansion = [
  { año: "2026", lugar: "Guatemala", tag: "Origen", color: "text-white" },
  { año: "2027", lugar: "Latinoamérica", tag: "Expansión", color: "text-white/70" },
  { año: "2028", lugar: "Global", tag: "Escala", color: "text-white/50" },
  { año: "2030", lugar: "El estándar", tag: "Legado", color: "text-[#e63329]" },
];

const manifesto = [
  { numero: "01", texto: "Cada peleador merece entrenarse como campeón — sin importar si está en Guatemala o Las Vegas." },
  { numero: "02", texto: "Los atletas de élite tienen coaches, analistas y tecnología. El resto entrena a ciegas. Eso termina aquí." },
  { numero: "03", texto: "Nacimos en Guatemala con una convicción: la mejor tecnología para el combate no tiene que venir de Silicon Valley." },
];

// Cuenta de 0 hasta "to" cuando entra en pantalla. pre/post = símbolos ($, M+, etc.)
function Contador({ to, pre = "", post = "" }: { to: number; pre?: string; post?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const enVista = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!enVista) return;
    const control = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => control.stop();
  }, [enVista, to]);

  return <span ref={ref}>{pre}{val}{post}</span>;
}

export default function VisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="vision"
      ref={ref}
      className="relative bg-[#0a0a0a] overflow-hidden"
    >
      {/* Línea top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2 }}
          style={{ originX: 0 }}
          className="h-full w-1/3 bg-gradient-to-r from-[#e63329]/60 to-transparent"
        />
      </div>

      {/* ── BLOQUE 1 — MANIFIESTO ── */}
      <div className="relative py-28 px-6 md:px-12 lg:px-20">

        {/* Número gigante de fondo */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 font-bebas text-[20rem] text-white/[0.02] leading-none select-none pointer-events-none">
          IQ
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">

            {/* Izquierda — label + título */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-32"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#e63329] text-[9px] font-bold tracking-[0.5em]"></span>
                <div className="w-6 h-px bg-[#e63329]/50" />
                <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase">Visión</span>
              </div>

              <h2 className="font-bebas text-6xl md:text-8xl text-white tracking-[0.01em] leading-[0.9] mb-8">
                POR QUÉ<br />
                EXISTE<br />
                <span className="text-[#e63329]">ROUNDIQ.</span>
              </h2>

              {/* Barra de oportunidad */}
              <div className="border border-white/[0.07] bg-[#0f0f0f] p-5">
                <p className="text-[9px] text-[#e63329]/60 tracking-[0.4em] uppercase font-bold mb-3">
                  La oportunidad
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  500M de practicantes. Cero plataformas de IA para el combate.{" "}
                  <span className="text-white font-bold">Nosotros somos los primeros.</span>
                </p>
              </div>
            </motion.div>

            {/* Derecha — manifesto en bloques */}
            <div className="flex flex-col gap-px">
              {manifesto.map((item, i) => (
                <motion.div
                  key={item.numero}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                  className="group relative border border-white/[0.06] bg-[#0f0f0f] hover:bg-[#111] p-8 transition-colors duration-300"
                >
                  {/* Línea roja izquierda en hover */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-px bg-[#e63329]"
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originY: 0 }}
                  />

                  <div className="flex items-start gap-6">
                    <span className="font-bebas text-4xl text-[#e63329]/20 group-hover:text-[#e63329]/50 transition-colors leading-none shrink-0 mt-1">
                      {item.numero}
                    </span>
                    <p className="text-white/50 group-hover:text-white/70 text-base md:text-lg leading-relaxed transition-colors duration-300">
                      {item.texto}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── BLOQUE 2 — STATS (widgets vivos) ── */}
      <div className="relative bg-[#0f0f0f] border-t border-b border-white/[0.05] py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.codigo}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              whileHover={{ y: -4 }}
              className="group relative border border-white/[0.07] bg-[#0a0a0a] p-6 overflow-hidden hover:border-[#e63329]/30 transition-colors duration-300"
            >
              {/* Esquinas HUD */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#e63329]/40" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#e63329]/40" />

              {/* Barra superior: código + indicador LIVE */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-[8px] font-mono text-white/25 tracking-[0.3em]">{stat.codigo}</span>
                <span className="flex items-center gap-1.5">
                  <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-[#e63329]"
                  />
                  <span className="text-[8px] font-mono text-white/25 tracking-[0.2em]">LIVE</span>
                </span>
              </div>

              {/* Número animado */}
              <span className="font-bebas text-6xl md:text-7xl text-[#e63329] leading-none block mb-2">
                <Contador to={stat.val} pre={stat.pre} post={stat.post} />
              </span>

              <span className="text-white/60 text-sm font-medium block">{stat.label}</span>
              <span className="text-white/20 text-xs">{stat.sub}</span>

              {/* Mini-barra que se llena */}
              <div className="mt-5 h-px w-full bg-white/[0.08] overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: `${stat.barra}%` } : {}}
                  transition={{ duration: 1.4, delay: 0.6 + i * 0.12, ease: "easeOut" }}
                  className="h-full bg-[#e63329]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── BLOQUE 3 — EXPANSIÓN TIMELINE ── */}
      <div className="relative py-28 px-6 md:px-12 lg:px-20">

        {/* Imagen de fondo con parallax */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 pointer-events-none"
        >
          <img
            src="/fighter.jpeg"
            alt=""
            className="w-full h-full object-cover object-top opacity-[0.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-16"
          >
            <div className="w-px h-4 bg-[#e63329]/50" />
            <span className="text-white/20 text-[9px] tracking-[0.4em] uppercase">Expansión global</span>
          </motion.div>

          {/* Timeline horizontal futurista */}
          <div className="relative">
            {/* Riel base gris */}
            <div className="absolute top-6 left-0 right-0 h-px bg-white/[0.06] hidden lg:block" />
            {/* Riel rojo que se dibuja */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
              style={{ originX: 0 }}
              className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-[#e63329] via-[#e63329]/60 to-[#e63329]/20 hidden lg:block"
            />
            {/* Pulso viajero: un brillo que recorre la línea en loop */}
            <motion.div
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute top-6 -translate-y-1/2 -translate-x-1/2 w-16 h-3 bg-[#e63329]/40 blur-md hidden lg:block"
            />

            {/* Línea vertical conectora — solo móvil/tablet */}
            <div className="lg:hidden absolute left-[6px] top-3 bottom-3 w-px bg-gradient-to-b from-[#e63329] via-[#e63329]/40 to-[#e63329]/10" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4">
              {expansion.map((hito, i) => (
                <motion.div
                  key={hito.año}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="group relative pl-8 lg:pl-0"
                >
                  {/* Nodo en la línea vertical — solo móvil/tablet */}
                  <span className="lg:hidden absolute left-0 top-7 flex items-center justify-center">
                    <span className={`w-3 h-3 rounded-full ring-4 ring-[#0a0a0a] ${i === 3 ? "bg-[#e63329]" : "bg-white/25"}`} />
                    {i === 3 && <span className="absolute w-3 h-3 rounded-full bg-[#e63329] animate-ping opacity-60" />}
                  </span>

                  {/* Nodo sobre la línea (con ping en el último) — desktop */}
                  <div className="hidden lg:flex items-center mb-8">
                    <span className="relative flex items-center justify-center">
                      <span className={`w-3 h-3 rounded-full ring-4 ring-[#0a0a0a] transition-colors duration-300 ${
                        i === 3 ? "bg-[#e63329]" : "bg-white/25 group-hover:bg-[#e63329]"
                      }`} />
                      {i === 3 && (
                        <span className="absolute w-3 h-3 rounded-full bg-[#e63329] animate-ping opacity-60" />
                      )}
                    </span>
                  </div>

                  {/* Card con esquinas HUD + scan line al hover */}
                  <div className="relative border border-white/[0.06] bg-[#0f0f0f]/80 backdrop-blur-sm group-hover:border-[#e63329]/30 p-6 transition-colors duration-300 overflow-hidden">
                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#e63329]/0 group-hover:border-[#e63329]/50 transition-colors duration-300" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#e63329]/0 group-hover:border-[#e63329]/50 transition-colors duration-300" />

                    {/* Scan line en hover */}
                    <motion.div
                      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e63329]/60 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] text-white/20 tracking-[0.3em] uppercase">{hito.tag}</span>
                      <span className="text-[8px] font-mono text-white/15">0{i + 1}/04</span>
                    </div>
                    <span className={`font-bebas text-4xl leading-none block mb-2 ${hito.color}`}>
                      {hito.año}
                    </span>
                    <h4 className="text-white/70 font-bold text-sm">{hito.lugar}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── BLOQUE 4 — CIERRE ── */}
      <div className="relative bg-[#0f0f0f] border-t border-white/[0.05] py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-bebas text-3xl md:text-5xl lg:text-6xl text-white/15 tracking-[0.03em] leading-tight mb-6"
          >
            &ldquo;El análisis que antes solo tenían{" "}
            <span className="text-white/50">los campeones,</span>{" "}
            <span className="text-white">ahora en tu teléfono.&rdquo;</span>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <div className="w-8 h-px bg-white/10" />
            <span className="text-[9px] text-white/20 tracking-[0.4em] uppercase">
              Rodrigo Rivera · Co-Founder &amp; CTO · IKBATECH
            </span>
            <div className="w-8 h-px bg-white/10" />
          </motion.div>

          <motion.a
            href="#waitlist"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-[#e63329] text-white text-[11px] font-black tracking-[0.3em] uppercase px-10 py-5 hover:bg-[#cc2a21] transition-colors"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
            Ser parte de esto →
          </motion.a>

        </div>
      </div>

    </section>
  );
}
