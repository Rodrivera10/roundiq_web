"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Íconos de las tiendas como SVG en línea (sin librerías externas).
// fill-current = el ícono toma el color del texto del padre.
function AppleIcon() {
  return (
    <svg viewBox="0 0 384 512" className="w-6 h-6 fill-current" aria-hidden>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current" aria-hidden>
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z" />
    </svg>
  );
}


// Puntos que explican el flujo de la app, al lado del teléfono.
const puntos = [
  { titulo: "Sube tu video", desc: "Graba tu sparring con cualquier teléfono y súbelo en segundos." },
  { titulo: "La IA lo analiza", desc: "Detecta guardia, postura, timing y patrones — frame por frame." },
  { titulo: "Recibe tu reporte", desc: "Métricas claras y drills personalizados en menos de 5 minutos." },
];

export default function AppPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="app"
      ref={ref}
      className="relative bg-[#0a0a0a] py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Línea top con acento (igual que tus otras secciones) */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2 }}
          style={{ originX: 0 }}
          className="h-full w-1/3 bg-gradient-to-r from-[#e63329]/60 to-transparent"
        />
      </div>

      {/* Glow rojo detrás del teléfono */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e63329]/[0.04] blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* COLUMNA IZQUIERDA — el teléfono */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          {/* El teléfono es un PNG sin fondo, así que flota libre sobre la sección.
              La sombra la damos con drop-shadow (sigue el contorno del PNG, no una caja). */}
          <motion.img
            src="/app-preview.png"
            alt="Vista previa de la app RoundIQ"
            className="w-full max-w-[320px] h-auto object-contain [filter:drop-shadow(0_40px_60px_rgba(0,0,0,0.7))_drop-shadow(0_0_50px_rgba(230,51,41,0.12))]"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* COLUMNA DERECHA — el texto */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Eyebrow: número + línea + label (ajusta el número según el orden final) */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[#e63329] text-[9px] font-bold tracking-[0.5em]"></span>
            <div className="w-6 h-px bg-[#e63329]/50" />
            <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase">La App</span>
          </div>

          <h2 className="font-bebas text-4xl md:text-6xl text-white tracking-[0.02em] leading-[0.95] mb-6">
            TU CORNER,<br />
            <span className="text-[#e63329]">EN TU BOLSILLO.</span>
          </h2>

          <p className="text-white/40 text-base leading-relaxed mb-10 max-w-md">
            Toda la inteligencia de RoundIQ vive en una app simple. Sin equipo caro,
            sin curva de aprendizaje. Solo tú, tu video y la IA.
          </p>

          {/* Lista de pasos */}
          <div className="flex flex-col gap-6">
                {/* Botones de descarga — placeholder hasta el lanzamiento */}
            <div className="mt-12">
            {/* Etiqueta "Próximamente" con punto pulsante */}
            <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e63329] opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#e63329]" />
                </span>
                <span className="text-[9px] text-white/40 tracking-[0.3em] uppercase font-bold">
                Próximamente en
                </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                {/* App Store — cambia href="#waitlist" por el link real al lanzar */}
                <motion.a
                href="#waitlist"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 border border-white/15 hover:border-[#e63329]/50 bg-[#0f0f0f] px-5 py-3 transition-colors duration-300"
                >
                <span className="text-white/80 group-hover:text-white transition-colors">
                    <AppleIcon />
                </span>
                <div className="text-left leading-tight">
                    <span className="block text-[8px] text-white/40 tracking-[0.2em] uppercase">
                    Descárgala en
                    </span>
                    <span className="block text-sm font-bold text-white tracking-wide">
                    App Store
                    </span>
                </div>
                </motion.a>

                {/* Google Play */}
                <motion.a
                href="#waitlist"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 border border-white/15 hover:border-[#e63329]/50 bg-[#0f0f0f] px-5 py-3 transition-colors duration-300"
                >
                <span className="text-white/80 group-hover:text-white transition-colors">
                    <PlayIcon />
                </span>
                <div className="text-left leading-tight">
                    <span className="block text-[8px] text-white/40 tracking-[0.2em] uppercase">
                    Disponible en
                    </span>
                    <span className="block text-sm font-bold text-white tracking-wide">
                    Google Play
                    </span>
                </div>
                </motion.a>
            </div>
            </div>

            {puntos.map((punto, i) => (
              <motion.div
                key={punto.titulo}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
                className="flex items-start gap-4"
              >
                <span className="font-bebas text-3xl text-[#e63329]/30 leading-none shrink-0">
                  0{i + 1}
                </span>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">{punto.titulo}</h4>
                  <p className="text-white/35 text-xs leading-relaxed">{punto.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
