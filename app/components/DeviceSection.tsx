"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const tabs = [
  {
    id: "camera",
    label: "Cámara",
    icon: "◉",
    specs: [
      { label: "Resolución", value: "1080p Full HD" },
      { label: "Campo de visión", value: "120° Ultra-Ancho" },
      { label: "Cuadros por segundo", value: "60fps / 120fps Cámara lenta" },
      { label: "Estabilización", value: "EIS + Giroscopio" },
      { label: "Visión nocturna", value: "Optimizada para poca luz" },
    ],
  },
  {
    id: "ai",
    label: "Motor IA",
    icon: "⬡",
    specs: [
      { label: "Detección de pose", value: "MediaPipe BlazePose" },
      { label: "Análisis", value: "GPT-4 Fight IQ" },
      { label: "Procesamiento", value: "Híbrido nube + edge" },
      { label: "Métricas", value: "Velocidad de golpe, ángulos, timing" },
      { label: "Reportes", value: "PDF + video post-sesión" },
    ],
  },
  {
    id: "hardware",
    label: "Hardware",
    icon: "▣",
    specs: [
      { label: "Batería", value: "4+ horas continuas" },
      { label: "Sincronización", value: "WiFi 6 auto-subida" },
      { label: "Peso", value: "62g ultraligero" },
      { label: "Resistencia al agua", value: "IPX5 a prueba de sudor" },
      { label: "Carga", value: "Dock magnético USB-C" },
    ],
  },
];

export default function DeviceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [tabActivo, setTabActivo] = useState("camera");
  const tabData = tabs.find(t => t.id === tabActivo)!;
  const tabIndex = tabs.findIndex(t => t.id === tabActivo);

  return (
    <section
      id="el-dispositivo"
      ref={ref}
      className="relative bg-[#0a0a0a] py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Grid de fondo */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow rojo diagonal */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e63329]/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#e63329]/[0.03] blur-[100px] pointer-events-none" />

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

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[#e63329] text-[9px] font-bold tracking-[0.5em]"></span>
            <div className="w-6 h-px bg-[#e63329]/50" />
            <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase">Ingeniería</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-[0.02em]">
              EL DISPOSITIVO
            </h2>
            <p className="text-white/25 text-sm max-w-xs leading-relaxed">
              Diseñado para el combate. Construido para sobrevivir cada round.
            </p>
          </div>
        </motion.div>

        {/* LAYOUT PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-10">

          {/* COLUMNA IZQUIERDA — imagen */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Contenedor de imagen principal */}
            <div className="relative bg-[#080808] border border-white/[0.07] overflow-hidden aspect-square group">

              {/* Scanner animado sobre la imagen */}
              <motion.div
                animate={{ top: ["5%", "90%", "5%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 right-0 z-10 pointer-events-none"
                style={{ position: "absolute" }}
              >
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e63329]/50 to-transparent" />
                <div className="w-full h-8 bg-gradient-to-b from-[#e63329]/8 to-transparent" />
              </motion.div>

              {/* Imagen del dispositivo */}
              <motion.img
                src="/device-hero.png"
                alt="Dispositivo RoundIQ"
                className="w-full h-full object-contain p-10 relative z-[1]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Esquinas HUD */}
              {[
                "top-4 left-4 border-t-2 border-l-2",
                "top-4 right-4 border-t-2 border-r-2",
                "bottom-4 left-4 border-b-2 border-l-2",
                "bottom-4 right-4 border-b-2 border-r-2",
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className={`absolute w-5 h-5 ${pos} border-[#e63329]/50 z-20`}
                />
              ))}

              {/* Indicador REC */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#e63329]"
                />
                <span className="text-[8px] text-[#e63329]/60 font-mono tracking-[0.3em] uppercase">En vivo</span>
              </div>

              {/* Timestamp */}
              <div className="absolute top-5 right-5 z-20">
                <motion.span
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[8px] text-white/20 font-mono tracking-wider"
                >
                  00:00:00
                </motion.span>
              </div>

              {/* Indicador de tab activo en la imagen */}
              <div className="absolute bottom-5 left-5 right-5 z-20">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] text-white/20 font-mono tracking-wider uppercase">
                    {tabData.label} · {tabData.specs.length} specs
                  </span>
                  <div className="flex gap-1">
                    {tabs.map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-px transition-all duration-300 ${
                          i === tabIndex ? "bg-[#e63329]" : "bg-white/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Barra de estado inferior */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Estado", value: "En línea", color: "text-emerald-400" },
                { label: "WiFi", value: "Listo", color: "text-white/60" },
                { label: "Almacenamiento", value: "64GB", color: "text-white/60" },
              ].map((item) => (
                <div key={item.label} className="border border-white/[0.06] bg-[#0f0f0f] px-4 py-3 flex flex-col gap-0.5">
                  <span className="text-[8px] text-white/20 tracking-[0.3em] uppercase">{item.label}</span>
                  <span className={`text-[11px] font-bold tracking-wider ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* COLUMNA DERECHA — tabs y specs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col"
          >
            {/* Tabs estilo terminal */}
            <div className="flex items-stretch border border-white/[0.07] mb-8 overflow-hidden">
              {tabs.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => setTabActivo(tab.id)}
                  className={`relative flex-1 flex items-center justify-center gap-2 py-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                    tabActivo === tab.id
                      ? "bg-[#e63329]/10 text-white"
                      : "text-white/25 hover:text-white/50 hover:bg-white/[0.02]"
                  } ${i > 0 ? "border-l border-white/[0.07]" : ""}`}
                >
                  {/* Indicador activo arriba */}
                  {tabActivo === tab.id && (
                    <motion.div
                      layoutId="tabIndicator"
                      className="absolute top-0 left-0 right-0 h-px bg-[#e63329]"
                    />
                  )}
                  <span>{tab.icon}</span>
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Specs — estilo terminal/dashboard */}
            <AnimatePresence mode="wait">
              <motion.div
                key={tabActivo}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex-1 border border-white/[0.07] bg-[#0f0f0f] overflow-hidden"
              >
                {/* Header del panel */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-[#080808]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#e63329] text-sm">{tabData.icon}</span>
                    <span className="text-[10px] text-white/40 font-mono tracking-[0.3em] uppercase">
                      Especificaciones · {tabData.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400/60" />
                    <span className="text-[8px] text-white/20 tracking-wider">verificado</span>
                  </div>
                </div>

                {/* Filas de specs */}
                <div className="divide-y divide-white/[0.04]">
                  {tabData.specs.map((spec, i) => (
                    <motion.div
                      key={spec.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center justify-between px-6 py-5 group hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {/* Número de índice estilo terminal */}
                        <span className="text-[9px] text-[#e63329]/30 font-mono w-4">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-white/35 text-sm group-hover:text-white/55 transition-colors">
                          {spec.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white font-bold text-sm text-right">
                          {spec.value}
                        </span>
                        {/* Indicador de calidad */}
                        <div className="w-1 h-1 rounded-full bg-[#e63329]/40 group-hover:bg-[#e63329] transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer del panel */}
                <div className="px-6 py-4 border-t border-white/[0.05] bg-[#080808] flex items-center justify-between">
                  <span className="text-[8px] text-white/15 font-mono tracking-[0.3em] uppercase">
                    roundiq · hardware v1.0
                  </span>
                  <div className="flex items-center gap-4">
                    {["Auto-sinc", "Nube", "OTA"].map((tag) => (
                      <span key={tag} className="text-[8px] text-white/15 tracking-[0.2em] uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
