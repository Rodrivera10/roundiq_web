"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  { pregunta: "¿Qué es RoundIQ exactamente?", respuesta: "RoundIQ es una plataforma de análisis de rendimiento para artes marciales. Graba tus sesiones de entrenamiento, las analiza con inteligencia artificial y te entrega un reporte detallado con métricas, errores técnicos y un plan de mejora personalizado — todo en menos de 5 minutos." },
  { pregunta: "¿Cuándo estará disponible la app?", respuesta: "La app para iOS y Android está en desarrollo activo. Los primeros atletas del waitlist recibirán acceso anticipado antes del lanzamiento oficial en Q2 2026. Al registrarte hoy aseguras tu posición y serás de los primeros en probarla." },
  { pregunta: "¿Necesito el dispositivo físico para usar la app?", respuesta: "No en esta primera fase. La app funcionará con videos grabados desde tu propio teléfono. Simplemente grabas tu sparring, subes el video a la app y la IA lo analiza. El dispositivo físico llegará después como upgrade premium." },
  { pregunta: "¿Qué tipo de análisis hace la IA?", respuesta: "La IA detecta postura corporal, guardia, distancia al oponente, timing de golpes, patrones de movimiento y footwork. Luego convierte esas métricas en lenguaje humano con drills específicos para mejorar." },
  { pregunta: "¿Para qué deportes funciona?", respuesta: "MMA, Boxeo, BJJ, Muay Thai y Wrestling en el lanzamiento. El análisis se adapta a cada disciplina. Planeamos expandir basado en el feedback de la comunidad." },
  { pregunta: "¿Por qué unirme al waitlist ahora?", respuesta: "Los primeros 300 atletas obtienen precio de fundador de por vida, acceso anticipado a la app beta, y su feedback moldea directamente las features que construimos. Después del lanzamiento ese precio ya no estará disponible." },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [abierta, setAbierta] = useState<number | null>(null);
  const toggle = (i: number) => setAbierta(abierta === i ? null : i);

  return (
    <section id="faq" ref={ref} className="relative bg-[#111111] py-28 px-6 md:px-12 lg:px-20">
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]">
        <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 1.2 }} style={{ originX: 0 }} className="h-full w-1/3 bg-gradient-to-r from-[#e63329]/60 to-transparent" />
      </div>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[#e63329] text-[9px] font-bold tracking-[0.5em]">05</span>
            <div className="w-6 h-px bg-[#e63329]/50" />
            <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase">Got questions</span>
          </div>
          <h2 className="font-bebas text-4xl md:text-6xl text-white tracking-[0.02em]">FAQ</h2>
        </motion.div>
        <div className="flex flex-col divide-y divide-white/[0.05]">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}>
              <button onClick={() => toggle(i)} className="w-full flex items-center justify-between py-6 text-left group">
                <span className={`text-sm md:text-base font-medium leading-relaxed transition-colors duration-200 pr-8 ${abierta === i ? "text-white" : "text-white/50 group-hover:text-white/75"}`}>
                  {faq.pregunta}
                </span>
                <motion.div animate={{ rotate: abierta === i ? 45 : 0 }} transition={{ duration: 0.25 }} className={`shrink-0 w-8 h-8 border flex items-center justify-center transition-colors duration-200 ${abierta === i ? "border-[#e63329] bg-[#e63329]/10 text-[#e63329]" : "border-white/10 text-white/30 group-hover:border-white/20"}`}>
                  <span className="text-lg leading-none">+</span>
                </motion.div>
              </button>
              <AnimatePresence>
                {abierta === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="overflow-hidden">
                    <div className="pb-6 border-l-2 border-[#e63329]/30 pl-5 ml-1">
                      <p className="text-white/40 text-sm leading-relaxed">{faq.respuesta}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.6 }} className="mt-16 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-white/30 text-sm">¿Tienes más preguntas?</p>
          <a href="mailto:hola@roundiq.com" className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#e63329]/70 hover:text-[#e63329] transition-colors border border-[#e63329]/20 hover:border-[#e63329]/50 px-6 py-3">
            Contáctanos →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
