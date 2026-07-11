"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Parallax suave en la imagen — se mueve más lento que el scroll
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  // Todo el contenido se desvanece al hacer scroll
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen bg-[#0a0a0a] overflow-hidden">

      {/* ── GRID FUTURISTA DE FONDO ── */}
      <motion.div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* ── COLUMNA DERECHA: IMAGEN ── */}
      {/* Ocupa la mitad derecha de la pantalla, recortada con gradiente */}
      <motion.div style={{ y: imgY }} className="absolute right-0 top-0 w-[75%] lg:w-[55%] h-full z-0 opacity-40 lg:opacity-100">
        <img
          src="/app-hero.png"
          alt="Interfaz de la app RoundIQ"
          className="w-full h-full object-contain object-center p-8 md:p-12"
        />
        {/* Gradiente desde la izquierda — fusiona imagen con fondo negro */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        {/* Gradiente desde abajo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        {/* Viñeta superior */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-transparent" />
      </motion.div>

      {/* ── LÍNEAS DECORATIVAS DE FONDO ── */}
      {/* Dan sensación de precisión técnica / HUD */}
      {/* ── SCANNER ANIMADO — línea que baja como un escáner real ── */}
{/* Piénsalo como el láser de un escáner de documento, pero vertical */}
<div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">

  {/* La línea del scanner — se mueve de arriba a abajo en loop infinito */}
  <motion.div
    animate={{ top: ["15%", "85%", "15%"] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    className="absolute left-0 right-0 h-px"
    style={{ position: "absolute" }}
  >
    {/* La línea en sí — gradiente de transparente a rojo a transparente */}
    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e63329]/40 to-transparent" />
    {/* Brillo debajo de la línea — como el halo del láser */}
    <div className="w-full h-4 bg-gradient-to-b from-[#e63329]/10 to-transparent" />
  </motion.div>

      </div>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto"
      >
        {/* Columna izquierda — max 50% en desktop */}
        <div className="w-full lg:w-[52%]">

          {/* BADGE ANIMADO — entra desde la izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center gap-3 mb-10"
          >
            {/* Punto rojo pulsante */}
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e63329] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#e63329]" />
            </span>
            <span className="text-[10px] font-medium tracking-[0.4em] text-white/40 uppercase">
              Tecnología para combate | En desarrollo
            </span>
          </motion.div>

          {/* TÍTULO — cada línea entra con delay diferente */}
          {/* Efecto: las palabras "caen" en cascada */}
          <div className="mb-10 overflow-hidden">
            {[
              { text: "Graba cada", delay: 0.5, color: "text-white/70", size: "text-4xl md:text-5xl lg:text-6xl" },
              { text: "round", delay: 0.65, color: "text-white", size: "text-5xl md:text-6xl lg:text-7xl" },
              { text: "Mejora con IA", delay: 0.8, color: "text-[#e63329]", size: "text-5xl md:text-6xl lg:text-7xl" },
            ].map((line) => (
              // Cada línea tiene su propio overflow-hidden para el efecto de "reveal"
              <div key={line.text} className="overflow-hidden">
                <motion.p
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: line.delay, ease: [0.16, 1, 0.3, 1] }}
                  className={`${line.size} ${line.color} font-bebas leading-[1] tracking-[0.02em]`}
                >
                  {line.text}
                </motion.p>
              </div>
            ))}
          </div>

          {/* DESCRIPCIÓN */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-white/40 text-sm md:text-base font-light leading-relaxed max-w-sm mb-10"
          >
            
            RoundIQ graba tus combates, los procesa con IA y te entrega un reporte detallado para que mejores cada round.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex items-center gap-4"
          >
            {/* Botón principal — contorno rojo animado */}
          <motion.a
            href="#waitlist"
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            initial="rest"
            animate="rest"
            className="relative group"
          >
            {/* Contorno rojo que pulsa */}
            <motion.span
              variants={{ rest: { opacity: 0.4, scale: 1 }, hover: { opacity: 1, scale: 1.02 } }}
              transition={{ duration: 0.3 }}
              className="absolute -inset-px border border-[#e63329]"
            />
            {/* Glow exterior al hover */}
            <motion.span
              variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
              transition={{ duration: 0.3 }}
              className="absolute -inset-[3px] border border-[#e63329]/20"
            />
            {/* Cuerpo */}
            <span className="relative flex items-center gap-4 bg-[#0a0a0a] group-hover:bg-[#e63329]/10 px-7 py-4 transition-all duration-300">
              {/* Ícono de guante */}
              <span className="text-base"></span>
              <span className="flex flex-col items-start">
                <span className="text-[11px] font-black tracking-[0.3em] uppercase text-white">
                  Unirme al Waitlist
                </span>
                <span className="text-[8px] tracking-[0.2em] text-white/40 uppercase">
                  +200 ya esperando
                </span>
              </span>
              <motion.span
                variants={{ rest: { x: 0, opacity: 0.4 }, hover: { x: 4, opacity: 1 } }}
                className="text-[#e63329] text-sm ml-1"
              >
                →
              </motion.span>
            </span>
          </motion.a>

            {/* BOTÓN VER DEMO — lleva a la sección app */}
            <motion.a
              href="#app"
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="relative flex items-center gap-3 px-5 py-4 group"
            >
              {/* Línea izquierda que crece al hover */}
              <motion.span
                variants={{ rest: { scaleY: 0.4, opacity: 0.2 }, hover: { scaleY: 1, opacity: 1 } }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-full bg-[#e63329]"
                style={{ originY: 0.5 }}
              />

              <span className="flex flex-col items-start pl-1">
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-white/40 group-hover:text-white/70 transition-colors duration-200">
                  Ver demo
                </span>
                {/* Sub-label que aparece al hover */}
                <motion.span
                  variants={{ rest: { opacity: 0, y: -4 }, hover: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.2 }}
                  className="text-[8px] tracking-[0.2em] text-[#e63329] uppercase"
                >
                  2 min
                </motion.span>
              </span>

              {/* Flecha con línea */}
              <motion.span
                variants={{ rest: { x: 0, opacity: 0.2 }, hover: { x: 3, opacity: 0.8 } }}
                transition={{ duration: 0.2 }}
                className="text-white text-xs"
              >
                ↗
              </motion.span>
            </motion.a>

          </motion.div>

          </div>
          {/* ── BARRA INFERIOR TECH ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/[0.06] bg-[#0a0a0a]/40 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <div className="flex items-stretch divide-x divide-white/[0.06]">

              {/* WIDGET: Cámara en vivo */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="flex items-center gap-3 px-5 py-4 group"
              >
                {/* Ícono de cámara minimalista */}
                <div className="relative w-6 h-6 shrink-0">
                  <div className="absolute inset-0 border border-white/20 rounded-sm group-hover:border-[#e63329]/60 transition-colors duration-300" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-white/30 group-hover:border-[#e63329]/60 transition-colors duration-300" />
                  {/* Punto REC pulsante */}
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#e63329]">
                    <span className="absolute inset-0 rounded-full bg-[#e63329] animate-ping opacity-75" />
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white/70 tracking-wider">1080p POV</span>
                  <span className="text-[9px] text-white/25 tracking-widest uppercase">Grabando</span>
                </div>
              </motion.div>

              {/* WIDGET: Análisis IA con barra de progreso animada */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9 }}
                className="flex items-center gap-3 px-5 py-4 flex-1 max-w-[160px]"
              >
                <div className="flex flex-col gap-1.5 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-white/70 tracking-wider">Análisis IA</span>
                    <span className="text-[9px] text-[#e63329] font-bold">86%</span>
                  </div>
                  {/* Barra de progreso que se llena al cargar */}
                  <div className="w-full h-px bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "86%" }}
                      transition={{ duration: 2, delay: 2.2, ease: "easeOut" }}
                      className="h-full bg-[#e63329]"
                    />
                  </div>
                  <span className="text-[9px] text-white/20 tracking-widest uppercase">Processing</span>
                </div>
              </motion.div>

              {/* WIDGET: Precisión */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0 }}
                className="hidden sm:flex items-center gap-3 px-5 py-4"
              >
                {/* Mini gráfica de barras — puramente CSS */}
                <div className="flex items-end gap-0.5 h-5">
                  {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 2.1 + i * 0.05, duration: 0.4, ease: "easeOut" }}
                      style={{ height: `${h}%`, originY: 1 }}
                      className={`w-1 rounded-sm ${i === 5 ? "bg-[#e63329]" : "bg-white/20"}`}
                    />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white/70 tracking-wider">Guardia</span>
                  <span className="text-[9px] text-white/25 tracking-widest uppercase">+12% semana</span>
                </div>
              </motion.div>

              {/* WIDGET: Status del sistema */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1 }}
                className="hidden md:flex items-center gap-3 px-5 py-4 ml-auto"
              >
                {/* Puntos de status — como semáforo de sistema */}
                <div className="flex flex-col gap-1">
                  {[
                    { label: "Cámara", active: true },
                    { label: "WiFi sync", active: true },
                    { label: "IA engine", active: true },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                      <div className={`w-1 h-1 rounded-full ${item.active ? "bg-emerald-400" : "bg-white/20"}`} />
                      <span className="text-[8px] text-white/20 tracking-widest uppercase">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="w-px h-8 bg-white/[0.06]" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-emerald-400/80 tracking-wider">Online</span>
                  <span className="text-[9px] text-white/20 tracking-widest uppercase">Todos sistemas</span>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>

      </motion.div>

      {/* SCROLL INDICATOR — esquina inferior derecha, por encima de la barra */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-20 right-8 md:right-12 z-30 flex flex-col items-center gap-3"
      >
        {/* Número de sección — estilo editorial */}
        <span className="text-[8px] font-bold text-white/15 tracking-[0.3em]">01</span>

        {/* Línea con punto que baja */}
        <div className="relative flex flex-col items-center w-px h-12 bg-white/[0.08]">
          <motion.div
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 w-px h-3 bg-[#e63329]"
          />
        </div>

        {/* Texto rotado */}
        <span
          className="text-[7px] font-medium text-white/15 tracking-[0.5em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Descubrir
        </span>
      </motion.div>

    </section>
  );

}