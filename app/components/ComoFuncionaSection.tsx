"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const pasos = [
  {
    numero: "01",
    titulo: "COLÓCALA",
    short: "Ajústala. Clípala.",
    descripcion: "Asegura la banda RoundIQ con el sistema quick-lock. Se ajusta sobre tu ropa o gi, quedando al nivel del pecho para captura POV perfecta sin interferir en el combate.",
    detalle: "120° FOV · Ajustable · Sin setup",
    img: "/Paso1.png",
  },
  {
    numero: "02",
    titulo: "ACTÍVALA",
    short: "Un toque. Listo.",
    descripcion: "Presiona el botón físico o actívala desde la app. La cámara 1080p arranca al instante. Un pulso confirma que estás grabando — sin pantallas, sin distracciones.",
    detalle: "1080p HD · Botón físico · App control",
    img: "/Paso2.png",
  },
  {
    numero: "03",
    titulo: "SINCRONIZA",
    short: "WiFi upload. Listo.",
    descripcion: "Al terminar, el video se transfiere automáticamente a tu perfil vía WiFi. La IA empieza a analizar frame por frame mientras te duchas.",
    detalle: "Auto-sync · WiFi · App iOS y Android",
    img: "/Paso3.png",
  },
  {
    numero: "04",
    titulo: "MEJORA",
    short: "La IA lo analiza todo.",
    descripcion: "En menos de 5 minutos recibes métricas de guardia, distancia, patrones y timing. GPT genera recomendaciones de drills específicos para tus debilidades.",
    detalle: "< 5min · IA · Plan personalizado",
    img: "/Paso4.png",
  },
];

export default function ComoFuncionaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  // Estado para saber cuál paso está expandido — null = ninguno
  const [expandido, setExpandido] = useState<number | null>(null);

  const toggleExpandido = (i: number) => {
    // Si ya está expandido, lo cerramos. Si no, lo abrimos.
    // Es como un acordeón — solo uno abierto a la vez
    setExpandido(expandido === i ? null : i);
  };

  return (
    <section
      id="como-funciona"
      ref={ref}
      className="relative bg-[#111111] py-28 px-6 md:px-12 lg:px-20"
    >
      {/* Línea top con acento rojo */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2 }}
          style={{ originX: 0 }}
          className="h-full w-1/3 bg-gradient-to-r from-[#e63329]/60 to-transparent"
        />
      </div>

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[#e63329] text-[9px] font-bold tracking-[0.5em]"></span>
            <div className="w-6 h-px bg-[#e63329]/50" />
            <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase">En desarrollo</span>
          </div>
          <h2 className="font-bebas text-4xl md:text-6xl text-white leading-[1] tracking-[0.02em]">
            IQ POV (proximamente) 
          </h2>
        </motion.div>

        {/* GRID DE CARDS — 4 columnas en desktop, 2 en tablet, 1 en móvil */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {pasos.map((paso, i) => (
            <motion.div
              key={paso.numero}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              // layoutId permite que la animación de expansión sea fluida
              layout
              onClick={() => toggleExpandido(i)}
              className={`group relative border transition-all duration-500 cursor-pointer overflow-hidden ${
                expandido === i
                  ? "border-[#e63329]/50 bg-[#0f0f0f]"
                  : "border-white/[0.07] bg-[#0f0f0f] hover:border-[#e63329]/30"
              }`}
            >
              {/* Línea top que aparece al expandir o hacer hover */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-[#e63329]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: expandido === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />

              {/* IMAGEN */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={paso.img}
                  alt={paso.titulo}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    expandido === i ? "scale-105" : "group-hover:scale-103"
                  }`}
                />
                {/* Gradiente sobre imagen */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />

                {/* Número HUD */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#e63329]" />
                  <span className="text-[9px] font-mono text-white/50 tracking-[0.3em]">
                    {paso.numero}
                  </span>
                </div>

                {/* Indicador expandido/cerrado — esquina superior derecha */}
                <div className="absolute top-3 right-3 w-6 h-6 border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <motion.span
                    animate={{ rotate: expandido === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/40 text-xs leading-none"
                  >
                    +
                  </motion.span>
                </div>
              </div>

              {/* CONTENIDO SIEMPRE VISIBLE */}
              <div className="p-5">
                <span className="text-[8px] text-[#e63329]/60 tracking-[0.4em] uppercase font-bold block mb-1">
                  {paso.short}
                </span>
                <h3 className="font-bebas text-xl text-white tracking-[0.05em] mb-2">
                  {paso.titulo}
                </h3>

                {/* Línea que crece en hover/expandido */}
                <div className={`h-px bg-white/10 mb-3 transition-all duration-300 ${
                  expandido === i ? "w-full bg-[#e63329]/30" : "w-6 group-hover:w-10"
                }`} />

                {/* DESCRIPCIÓN EXPANDIBLE — AnimatePresence maneja entrada y salida */}
                <AnimatePresence>
                  {expandido === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <p className="text-white/40 text-[12px] leading-relaxed mb-4">
                        {paso.descripcion}
                      </p>
                      {/* Tag técnico */}
                      <div className="flex items-center gap-2 pt-3 border-t border-white/[0.05]">
                        <div className="w-1 h-1 rounded-full bg-[#e63329]/60 shrink-0" />
                        <span className="text-[8px] text-white/20 tracking-[0.2em] uppercase">
                          {paso.detalle}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hint cuando está cerrado */}
                {expandido !== i && (
                  <p className="text-white/20 text-[11px] tracking-wider">
                    Toca para ver más →
                  </p>
                )}
              </div>

            </motion.div>
          ))}
        </div>

        {/* BARRA INFERIOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-1 h-1 rounded-full bg-[#e63329]" />
            <span className="text-[9px] text-white/20 tracking-[0.4em] uppercase">
              Automático · Sin fricción · Siempre contigo
            </span>
          </div>
          <span className="text-[9px] text-white/10 tracking-[0.3em] uppercase hidden md:block">
            roundIQ · Sistema completo
          </span>
        </motion.div>

      </div>
    </section>
  );
}