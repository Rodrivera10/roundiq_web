"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

// ── Datos de los planes ──
// Guardamos SOLO el precio mensual. El precio anual lo calculamos
// con matemática (mensual × 10 = 2 meses gratis), así nunca se desincronizan.
const planes = [
  {
    numero: "01",
    nombre: "STARTER",
    sub: "Para empezar en serio",
    mensual: 8,
    descripcion: "Tus primeros pasos con análisis de IA. Ideal para entrenar con datos sin compromiso.",
    features: [
      "5 análisis de video por mes",
      "Métricas básicas: guardia, postura, chin",
      "Reporte con 5 observaciones por sesión",
      "Historial de las últimas 4 sesiones",
      "Racha de entrenamiento (streak)",
      "Acceso al foro de la comunidad",
    ],
    destacado: false,
    badge: null,
    color: "border-white/[0.07] hover:border-[#e63329]/20",
    btnClass: "border border-white/10 text-white/60 hover:border-[#e63329]/40 hover:text-white",
  },
  {
    numero: "02",
    nombre: "FIGHTER",
    sub: "Para el peleador serio",
    mensual: 14,
    descripcion: "El más popular. Para competidores comprometidos con mejorar cada semana.",
    features: [
      "20 análisis por mes",
      "Todo lo de Starter",
      "Score por categoría (guardia, footwork, timing)",
      "Plan de drills semanal generado por IA",
      "Comparación sesión vs sesión",
      "Clips automáticos de mejores y peores momentos",
      "Insignias y logros desbloqueables",
      "Tabla de líderes de la comunidad",
    ],
    destacado: true,
    badge: "MÁS POPULAR",
    color: "border-[#e63329]/40",
    btnClass: "bg-[#e63329] text-white hover:bg-[#cc2a21]",
  },
  {
    numero: "03",
    nombre: "APEX",
    sub: "Nivel profesional",
    mensual: 18,
    descripcion: "El estándar más alto. Para los que no aceptan menos que lo mejor.",
    features: [
      "Análisis ilimitados",
      "Todo lo de Fighter",
      "Análisis de patrones del rival",
      "Plan de campamento mensual generado por IA",
      "Feedback prioritario — análisis en menos de 2 minutos",
      "Badge \"Apex\" en tu perfil",
      "Acceso anticipado a nuevas features",
      "1 sesión con coach virtual por mes",
    ],
    destacado: false,
    badge: "PRO",
    color: "border-white/[0.07] hover:border-[#e63329]/20",
    btnClass: "border border-white/10 text-white/60 hover:border-[#e63329]/40 hover:text-white",
  },
];

export default function MembresiasSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Estado del toggle: false = mensual, true = anual.
  // Cuando cambia, React redibuja las tarjetas con el precio correcto.
  const [anual, setAnual] = useState(false);

  return (
    <section
      id="membresias"
      ref={ref}
      className="relative bg-[#0a0a0a] py-28 px-6 md:px-12 lg:px-20"
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

      {/* Glow central sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#e63329]/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-[#e63329] text-[9px] font-bold tracking-[0.5em]"></span>
            <div className="w-6 h-px bg-[#e63329]/50" />
            <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase"></span>
          </div>
          <h2 className="font-bebas text-4xl md:text-6xl text-white tracking-[0.02em]">
            MEMBRESÍAS
          </h2>
          <p className="text-white/30 text-sm mt-3 max-w-md mx-auto">
            Solo necesitas tu teléfono. Sube el video de tu sesión y la IA lo analiza.
            Empezamos con Boxeo.
          </p>
        </motion.div>

        {/* TOGGLE Mensual / Anual */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-14"
        >
          <div className="inline-flex items-center border border-white/[0.1] bg-[#0f0f0f] p-1">
            {/* Botón Mensual */}
            <button
              onClick={() => setAnual(false)}
              className={`relative px-6 py-2.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                !anual ? "text-white" : "text-white/40 hover:text-white/60"
              }`}
            >
              {/* Pastilla roja que se desliza bajo la opción activa */}
              {!anual && (
                <motion.div
                  layoutId="toggleActivo"
                  className="absolute inset-0 bg-[#e63329]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">Mensual</span>
            </button>

            {/* Botón Anual */}
            <button
              onClick={() => setAnual(true)}
              className={`relative px-6 py-2.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 flex items-center gap-2 ${
                anual ? "text-white" : "text-white/40 hover:text-white/60"
              }`}
            >
              {anual && (
                <motion.div
                  layoutId="toggleActivo"
                  className="absolute inset-0 bg-[#e63329]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">Anual</span>
              <span className={`relative z-10 text-[9px] ${anual ? "text-white/80" : "text-[#e63329]/70"}`}>
                −17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {planes.map((plan, i) => {
            // Precio según el toggle: anual = 10 meses (2 gratis).
            const precio = anual ? plan.mensual * 10 : plan.mensual;
            return (
              <motion.div
                key={plan.nombre}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                className={`relative flex flex-col border bg-[#0f0f0f] transition-all duration-500 ${plan.color} ${
                  plan.destacado ? "shadow-[0_0_40px_-10px_rgba(230,51,41,0.2)]" : ""
                }`}
              >
                {/* Borde pulsante en la tarjeta destacada */}
                {plan.destacado && (
                  <motion.div
                    className="absolute inset-0 border border-[#e63329] pointer-events-none"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}

                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute -top-3 left-6 px-3 py-1 text-[9px] font-bold tracking-[0.3em] uppercase ${
                    plan.destacado ? "bg-[#e63329] text-white" : "bg-white/10 text-white/40"
                  }`}>
                    {plan.badge}
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">

                  {/* Número + nombre */}
                  <div className="mb-6">
                    <span className="text-[9px] text-[#e63329]/50 tracking-[0.4em] font-bold block mb-1">
                      {plan.numero}
                    </span>
                    <h3 className="font-bebas text-3xl text-white tracking-[0.05em]">
                      {plan.nombre}
                    </h3>
                    <p className="text-white/30 text-xs mt-1">{plan.sub}</p>
                  </div>

                  {/* Precio */}
                  <div className="mb-6 pb-6 border-b border-white/[0.05]">
                    <div className="flex items-baseline gap-1">
                      <span className="font-bebas text-6xl text-white leading-none">
                        ${precio}
                      </span>
                      <span className="text-white/30 text-sm">
                        {anual ? "/año" : "/mes"}
                      </span>
                    </div>
                    {/* Mensaje que cambia según el toggle */}
                    {anual ? (
                      <p className="text-[#e63329]/70 text-xs mt-1">
                        2 meses gratis · equivale a ${plan.mensual}/mes
                      </p>
                    ) : (
                      <p className="text-white/25 text-xs mt-1">
                        Facturación mensual · cancela cuando quieras
                      </p>
                    )}
                    <p className="text-white/30 text-xs mt-3 leading-relaxed">
                      {plan.descripcion}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="flex-1 space-y-2.5 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="text-[#e63329] text-xs mt-0.5 shrink-0">✓</span>
                        <span className="text-white/40 text-xs leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.a
                    href="#waitlist"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`block text-center w-full py-4 text-[11px] font-black tracking-[0.25em] uppercase transition-colors duration-300 ${plan.btnClass}`}
                  >
                    Unirme al Waitlist
                  </motion.a>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* NOTA INFERIOR */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center text-white/15 text-[10px] tracking-[0.3em] uppercase mt-10"
        >
          Precios en USD · Cancela cuando quieras · Lanzamiento Q2 2026
        </motion.p>

      </div>
    </section>
  );
}
