"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Confetti from "@/app/components/Confetti";
import { SITE_URL } from "@/app/lib/site";

const DEPORTES = [
  { label: "MMA", code: "01" },
  { label: "Boxeo", code: "02" },
  { label: "Otro", code: "03" },
];

const ROLES = [
  { label: "Atleta", desc: "Quiero mejorar mi rendimiento" },
  { label: "Entrenador", desc: "Quiero analizar a mis atletas" },
];

type Paso = 1 | 2 | 3 | 4;

// ── Mensaje para compartir — centralizado, se usa en copiar/Twitter/WhatsApp ──
const mensajeCompartir = (posicion: number) =>
  `Acabo de reservar mi lugar #${posicion} en RoundIQ 🥊 La IA que analiza tu entrenamiento de combate y te dice exactamente cómo mejorar cada round. Acceso anticipado y precio de fundador para los primeros. Súmate 👉 ${SITE_URL}/`;

// ── Esquinas HUD que laten — marco futurista ──
function EsquinasHUD() {
  return (
    <>
      {[
        "top-0 left-0 border-t-2 border-l-2",
        "top-0 right-0 border-t-2 border-r-2",
        "bottom-0 left-0 border-b-2 border-l-2",
        "bottom-0 right-0 border-b-2 border-r-2",
      ].map((pos, i) => (
        <motion.div
          key={pos}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
          className={`absolute w-5 h-5 ${pos} border-[#e63329]/60 pointer-events-none z-20`}
        />
      ))}
    </>
  );
}

// ── Número que se "decodifica": dígitos aleatorios que se fijan uno a uno ──
function NumeroDecodificado({ posicion }: { posicion: number }) {
  const final = String(posicion).padStart(4, "0");
  const [display, setDisplay] = useState("0000");

  useEffect(() => {
    let frame = 0;
    const total = 20;
    const id = setInterval(() => {
      frame++;
      if (frame >= total) {
        setDisplay(final);
        clearInterval(id);
        return;
      }
      // Cuántos dígitos ya están fijos; el resto sigue girando aleatorio
      const revelados = Math.floor((frame / total) * final.length);
      const next = final
        .split("")
        .map((ch, i) => (i < revelados ? ch : String(Math.floor(Math.random() * 10))))
        .join("");
      setDisplay(next);
    }, 55);
    return () => clearInterval(id);
  }, [final]);

  return <>#{display}</>;
}

// ── Botón de copiar con feedback visual ──
function CopyButton({ posicion }: { posicion: number }) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    await navigator.clipboard.writeText(mensajeCompartir(posicion));
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <motion.button
      onClick={copiar}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      className="w-full border border-[#e63329]/30 hover:border-[#e63329]/60 text-[10px] font-bold tracking-[0.3em] uppercase py-4 transition-all relative overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {copiado ? (
          <motion.span
            key="copiado"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-emerald-400 flex items-center justify-center gap-2"
          >
            ✓ Copiado al portapapeles
          </motion.span>
        ) : (
          <motion.span
            key="copiar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-white/50 flex items-center justify-center gap-2"
          >
            Copiar y compartir mi posición
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ── Componente principal ──
export default function WaitlistSection() {
  const [paso, setPaso] = useState<Paso>(1);
  const [email, setEmail] = useState("");
  const [deporte, setDeporte] = useState("");
  const [rol, setRol] = useState("");
  const [posicion, setPosicion] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [contador, setContador] = useState(0);

  // Contador animado que sube hasta 200
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setContador(prev => {
          if (prev >= 200) { clearInterval(interval); return 200; }
          return prev + 4;
        });
      }, 20);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const enviar = async (rolSeleccionado: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, deporte, rol: rolSeleccionado }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al registrarse");
        setLoading(false);
        return;
      }
      setPosicion(data.posicion);
      setPaso(4);
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const emailValido = email.includes("@") && email.includes(".");

  return (
    <section
      id="waitlist"
      className="relative bg-[#0a0a0a] py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Grid de fondo animado */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "64px 64px"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Haz de escaneo que recorre toda la sección */}
      <motion.div
        className="absolute left-0 right-0 h-24 bg-gradient-to-b from-[#e63329]/[0.06] to-transparent pointer-events-none"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      {/* Glow de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#e63329]/[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e63329]/40 to-transparent" />

      <div className="relative max-w-6xl mx-auto z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-[#e63329] text-[9px] font-bold tracking-[0.5em]"></span>
            <div className="w-6 h-px bg-[#e63329]/50" />
            <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase"></span>
          </div>
          <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-[0.02em] leading-[0.95]">
            LISTO PARA<br />
            PELEAR MÁS<br />
            <span className="text-[#e63329]">INTELIGENTE?</span>
          </h2>
        </motion.div>

        {/* LAYOUT: info izquierda + form derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* COLUMNA IZQUIERDA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-12"
          >
            {/* Contador — widget con radar + ecualizador */}
            <div className="relative border border-white/[0.07] bg-[#0c0c0c]/60 backdrop-blur-sm p-7 overflow-hidden">
              <EsquinasHUD />

              <div className="flex items-center gap-2 mb-5">
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#e63329]"
                />
                <span className="font-mono text-[8px] text-white/30 tracking-[0.4em] uppercase">
                  Fighters_online
                </span>
              </div>

              <div className="flex items-end gap-2">
                <span className="font-bebas text-8xl text-white leading-[0.8]">{contador}</span>
                <span className="font-bebas text-4xl text-[#e63329] leading-none mb-2">+</span>
              </div>

              <p className="text-white/40 text-sm mt-4 mb-5">peleadores ya en la lista</p>
              <div className="w-full h-px bg-white/[0.08] overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "67%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-[#e63329]"
                />
              </div>
              <p className="font-mono text-[9px] text-white/20 tracking-[0.3em] uppercase mt-3">
                Cupo de lanzamiento · 300 atletas
              </p>
            </div>

            {/* 3 razones */}
            <div className="flex flex-col gap-px">
              {[
                { n: "01", titulo: "Acceso anticipado", desc: "Sé el primero en recibir el dispositivo cuando lancemos en Q2 2026." },
                { n: "02", titulo: "Precio de fundador", desc: "Los primeros 300 atletas obtienen precio especial de por vida." },
                { n: "03", titulo: "Influye en el producto", desc: "Tu feedback moldea las features. Tú decides qué métricas importan." },
              ].map((item, i) => (
                <motion.div
                  key={item.n}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="group flex items-start gap-5 py-5 border-t border-white/[0.06] hover:border-[#e63329]/30 transition-colors"
                >
                  <span className="font-mono text-[10px] text-[#e63329]/40 group-hover:text-[#e63329] transition-colors mt-1 shrink-0">
                    {item.n}
                  </span>
                  <div>
                    <h4 className="text-white/80 font-medium text-sm mb-1">{item.titulo}</h4>
                    <p className="text-white/35 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* COLUMNA DERECHA — formulario con marco HUD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative border border-white/[0.08] bg-[#0c0c0c]/80 backdrop-blur-sm shadow-[0_0_50px_-12px_rgba(230,51,41,0.25)]"
          >
            <EsquinasHUD />

            {/* Línea top con barrido animado */}
            <div className="absolute top-0 left-0 right-0 h-px bg-[#e63329]/20 overflow-hidden">
              <motion.div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#e63329] to-transparent"
                animate={{ x: ["-100%", "400%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="p-8 md:p-10">

              {/* Barra de progreso minimalista */}
              {paso < 4 && (
                <div className="flex items-center gap-2 mb-10">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <span className={`font-mono text-[9px] tracking-wider transition-colors ${
                        s <= paso ? "text-[#e63329]" : "text-white/20"
                      }`}>
                        0{s}
                      </span>
                      <div className="h-px flex-1 bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: s <= paso ? "100%" : "0%" }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-[#e63329]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <AnimatePresence mode="wait">

                {/* PASO 1 — Email */}
                {paso === 1 && (
                  <motion.div
                    key="paso1"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="font-mono text-[9px] text-[#e63329] tracking-[0.4em] uppercase block mb-3">
                      Paso 01 / 03
                    </span>
                    <h3 className="font-bebas text-4xl text-white tracking-[0.05em] mb-2">
                      ENTRA AL RING
                    </h3>
                    <p className="text-white/30 text-xs mb-10">
                      Tu email es tu ticket de entrada. Nunca spam.
                    </p>

                    <div className="relative mb-8 group">
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                        onKeyDown={(e) => { if (e.key === "Enter" && emailValido) setPaso(2); }}
                        className="w-full bg-transparent border-b border-white/15 focus:border-[#e63329] text-white text-xl py-3 outline-none transition-colors duration-300 placeholder:text-white/15"
                        autoFocus
                      />
                      {/* Resplandor de foco bajo el input */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#e63329] blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                      <AnimatePresence>
                        {emailValido && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute right-0 bottom-3 text-emerald-400 text-sm"
                          >
                            ✓
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    {error && (
                      <p className="text-[#e63329] text-xs mb-4 tracking-wider">{error}</p>
                    )}

                    <motion.button
                      onClick={() => emailValido && setPaso(2)}
                      disabled={!emailValido}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative w-full bg-[#e63329] text-white font-black text-[11px] tracking-[0.3em] uppercase py-5 hover:bg-[#cc2a21] transition-colors disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden"
                    >
                      {/* Barrido de brillo */}
                      <motion.span
                        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-150%", "450%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span className="relative">Continuar →</span>
                    </motion.button>
                  </motion.div>
                )}

                {/* PASO 2 — Deporte */}
                {paso === 2 && (
                  <motion.div
                    key="paso2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="font-mono text-[9px] text-[#e63329] tracking-[0.4em] uppercase block mb-3">
                      Paso 02 / 03
                    </span>
                    <h3 className="font-bebas text-4xl text-white tracking-[0.05em] mb-2">
                      TU DISCIPLINA
                    </h3>
                    <p className="text-white/30 text-xs mb-8">
                      Optimizamos el análisis para tu deporte específico.
                    </p>

                    {/* Una sola columna: con 3 opciones, dos columnas dejarían la última suelta */}
                    <div className="grid grid-cols-1 gap-2 mb-8">
                      {DEPORTES.map((d) => (
                        <button
                          key={d.label}
                          onClick={() => { setDeporte(d.label); setPaso(3); }}
                          className={`relative py-5 px-4 border transition-all duration-200 flex items-center justify-between group overflow-hidden ${
                            deporte === d.label
                              ? "border-[#e63329] bg-[#e63329]/10"
                              : "border-white/[0.07] hover:border-[#e63329]/40"
                          }`}
                        >
                          {/* Relleno que se desliza desde la izquierda */}
                          <span className="absolute inset-0 bg-[#e63329]/10 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out pointer-events-none" />
                          {/* Barra de acento izquierda que crece */}
                          <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e63329] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 pointer-events-none" />
                          <span className={`relative text-[11px] font-bold tracking-[0.2em] uppercase transition-colors ${
                            deporte === d.label ? "text-white" : "text-white/50 group-hover:text-white"
                          }`}>
                            {d.label}
                          </span>
                          {/* Flecha que aparece al hover */}
                          <span className="relative text-[#e63329] text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            →
                          </span>
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setPaso(1)}
                      className="font-mono text-[10px] text-white/20 hover:text-white/50 transition-colors tracking-wider"
                    >
                      ← Volver
                    </button>
                  </motion.div>
                )}

                {/* PASO 3 — Rol */}
                {paso === 3 && (
                  <motion.div
                    key="paso3"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="font-mono text-[9px] text-[#e63329] tracking-[0.4em] uppercase block mb-3">
                      Paso 03 / 03
                    </span>
                    <h3 className="font-bebas text-4xl text-white tracking-[0.05em] mb-2">
                      TU ROL
                    </h3>
                    <p className="text-white/30 text-xs mb-8">
                      Último paso. Personalizamos tu experiencia.
                    </p>

                    <div className="flex flex-col gap-2 mb-8">
                      {ROLES.map((r) => (
                        <button
                          key={r.label}
                          onClick={() => { setRol(r.label); enviar(r.label); }}
                          disabled={loading}
                          className={`relative py-6 px-6 border transition-all duration-200 flex items-center gap-5 group text-left overflow-hidden ${
                            rol === r.label
                              ? "border-[#e63329] bg-[#e63329]/10"
                              : "border-white/[0.07] hover:border-[#e63329]/40"
                          } disabled:opacity-50`}
                        >
                          {/* Relleno que se desliza desde la izquierda */}
                          <span className="absolute inset-0 bg-[#e63329]/10 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out pointer-events-none" />
                          {/* Barra de acento izquierda que crece */}
                          <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e63329] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 pointer-events-none" />
                          <div className="relative flex-1">
                            <p className="text-white font-medium text-base tracking-wide">{r.label}</p>
                            <p className="text-white/30 text-xs mt-0.5">{r.desc}</p>
                          </div>
                          {loading && rol === r.label && (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="relative w-4 h-4 border-2 border-[#e63329] border-t-transparent rounded-full"
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    {error && (
                      <p className="text-[#e63329] text-xs mb-4 tracking-wider text-center">{error}</p>
                    )}

                    <button
                      onClick={() => setPaso(2)}
                      className="font-mono text-[10px] text-white/20 hover:text-white/50 transition-colors tracking-wider"
                    >
                      ← Volver
                    </button>
                  </motion.div>
                )}

                {/* PASO 4 — Confirmación */}
                {paso === 4 && posicion !== null && (
                  <motion.div
                    key="paso4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden"
                  >
                    {/* Se dispara solo al montarse este paso, una única vez */}
                    <Confetti />

                    <div className="py-6 px-2 text-center">

                      {/* Status chip */}
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 border border-emerald-400/30 bg-emerald-400/5 px-4 py-2 mb-8"
                      >
                        <motion.div
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                        />
                        <span className="font-mono text-[9px] text-emerald-400/80 tracking-[0.3em] uppercase">
                          Registro confirmado
                        </span>
                      </motion.div>

                      {/* Bienvenida — entra junto con el confeti */}
                      <motion.h3
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                        className="font-bebas text-3xl md:text-4xl text-white tracking-[0.04em] leading-none mb-2"
                      >
                        BIENVENIDO A <span className="text-[#e63329]">ROUNDIQ</span>
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-white/35 text-xs mb-8"
                      >
                        Ya estás dentro. Tu lugar quedó reservado.
                      </motion.p>

                      {/* Número con marco HUD + decodificación */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
                        className="relative inline-block px-10 py-4 mb-8 overflow-hidden"
                      >
                        {/* Esquinas del marco */}
                        {[
                          "top-0 left-0 border-t border-l",
                          "top-0 right-0 border-t border-r",
                          "bottom-0 left-0 border-b border-l",
                          "bottom-0 right-0 border-b border-r",
                        ].map((p) => (
                          <span key={p} className={`absolute w-4 h-4 ${p} border-[#e63329]/50`} />
                        ))}

                        {/* Scanline sobre el número */}
                        <motion.span
                          className="absolute left-2 right-2 h-px bg-[#e63329]/40 pointer-events-none"
                          animate={{ top: ["12%", "88%", "12%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <p className="font-mono text-[9px] text-white/25 tracking-[0.5em] uppercase mb-1">
                          Posición asignada
                        </p>
                        <h3 className="font-bebas text-8xl md:text-9xl text-white leading-none tabular-nums">
                          <NumeroDecodificado posicion={posicion} />
                        </h3>
                      </motion.div>

                      {/* Readout estilo terminal */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="border border-white/[0.07] bg-[#080808]/60 px-5 py-3 mb-8 font-mono text-left"
                      >
                        {[
                          { k: "ID_registro", v: `RIQ-${String(posicion).padStart(4, "0")}` },
                          { k: "Disciplina", v: deporte },
                          { k: "Perfil", v: rol },
                          { k: "Lanzamiento", v: "Q2 2026", accent: true },
                        ].map((row) => (
                          <div
                            key={row.k}
                            className="flex items-center gap-2 py-1 text-[9px] tracking-[0.2em] uppercase"
                          >
                            <span className="text-white/25">{row.k}</span>
                            <span className="flex-1 border-b border-dotted border-white/10" />
                            <span className={row.accent ? "text-[#e63329]/70" : "text-white/60"}>{row.v}</span>
                          </div>
                        ))}
                      </motion.div>

                      {/* Acciones */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col gap-3"
                      >
                        <CopyButton posicion={posicion} />

                        <div className="grid grid-cols-2 gap-2">
                          <motion.a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(mensajeCompartir(posicion))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="py-3 border border-white/10 text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase hover:border-white/20 hover:text-white/50 transition-all text-center"
                          >
                            Twitter / X
                          </motion.a>
                          <motion.a
                            href={`https://wa.me/?text=${encodeURIComponent(mensajeCompartir(posicion))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="py-3 border border-white/10 text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase hover:border-white/20 hover:text-white/50 transition-all text-center"
                          >
                            WhatsApp
                          </motion.a>
                        </div>

                        <p className="text-[9px] text-white/15 tracking-wider text-center mt-2">
                          Te avisaremos en{" "}
                          <span className="text-white/30">{email}</span>{" "}
                          cuando lancemos
                        </p>
                      </motion.div>

                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
