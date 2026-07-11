"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Colores de marca: rojo dominante + blancos y grises para dar contraste.
const COLORES = ["#e63329", "#ff6b5e", "#ffffff", "#f2f2f2", "#8a8a8a"];

// Física de la simulación (valores en px por frame, normalizados a 60fps).
const GRAVEDAD = 0.32;
const ROZAMIENTO = 0.992;
const DURACION_MS = 5000;

type Particula = {
  x: number; y: number;
  vx: number; vy: number;
  rot: number; vrot: number;
  ancho: number; alto: number;
  color: string;
  cinta: boolean; // las cintas son alargadas y ondulan; los cuadros no
  fase: number;
};

function crearParticulas(ancho: number, alto: number): Particula[] {
  const ps: Particula[] = [];

  // Dos cañones desde las esquinas inferiores, apuntando hacia adentro y arriba.
  const canones = [
    { x: ancho * 0.12, y: alto + 10, angulo: -Math.PI / 2.6 },
    { x: ancho * 0.88, y: alto + 10, angulo: -Math.PI + Math.PI / 2.6 },
  ];

  for (const canon of canones) {
    for (let i = 0; i < 70; i++) {
      const dispersion = (Math.random() - 0.5) * 0.7;
      const angulo = canon.angulo + dispersion;
      const fuerza = 17 + Math.random() * 13;
      const cinta = Math.random() > 0.55;
      ps.push({
        x: canon.x + (Math.random() - 0.5) * 40,
        y: canon.y,
        vx: Math.cos(angulo) * fuerza,
        vy: Math.sin(angulo) * fuerza,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.3,
        ancho: cinta ? 3 + Math.random() * 3 : 6 + Math.random() * 5,
        alto: cinta ? 10 + Math.random() * 10 : 6 + Math.random() * 5,
        color: COLORES[Math.floor(Math.random() * COLORES.length)],
        cinta,
        fase: Math.random() * Math.PI * 2,
      });
    }
  }
  return ps;
}

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [montado, setMontado] = useState(false);

  // El portal necesita document, que no existe en el render del servidor.
  useEffect(() => setMontado(true), []);

  useEffect(() => {
    if (!montado) return;

    // Respetamos a quien pidió menos animación en su sistema operativo.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // En pantallas retina dibujamos al doble de resolución para que no se vea borroso.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ancho = window.innerWidth;
    const alto = window.innerHeight;
    canvas.width = ancho * dpr;
    canvas.height = alto * dpr;
    ctx.scale(dpr, dpr);

    let particulas = crearParticulas(ancho, alto);
    const inicio = performance.now();
    let frame = 0;

    const dibujar = (ahora: number) => {
      const transcurrido = ahora - inicio;
      ctx.clearRect(0, 0, ancho, alto);

      // Se desvanecen al final en vez de desaparecer de golpe.
      const desvanecer = Math.max(0, 1 - Math.max(0, transcurrido - DURACION_MS * 0.7) / (DURACION_MS * 0.3));

      for (const p of particulas) {
        p.vy += GRAVEDAD;
        p.vx *= ROZAMIENTO;
        p.vy *= ROZAMIENTO;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        p.fase += 0.1;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        // Al escalar el eje X con un seno, el papel parece girar sobre sí mismo.
        ctx.scale(p.cinta ? Math.cos(p.fase) : 1, 1);
        ctx.globalAlpha = desvanecer;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.ancho / 2, -p.alto / 2, p.ancho, p.alto);
        ctx.restore();
      }

      // Descartamos lo que ya salió de pantalla para no gastar CPU de más.
      if (frame % 20 === 0) {
        particulas = particulas.filter((p) => p.y < alto + 60 && p.x > -80 && p.x < ancho + 80);
      }
      frame++;

      if (transcurrido < DURACION_MS && particulas.length > 0) {
        id = requestAnimationFrame(dibujar);
      } else {
        ctx.clearRect(0, 0, ancho, alto);
      }
    };

    let id = requestAnimationFrame(dibujar);
    return () => cancelAnimationFrame(id);
  }, [montado]);

  if (!montado) return null;

  return createPortal(
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    />,
    document.body
  );
}
