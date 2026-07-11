# RoundIQ — CLAUDE.md

## Qué es este proyecto
RoundIQ es una startup de tecnología deportiva enfocada en artes marciales y deportes de combate (MMA, Boxeo, BJJ, Muay Thai, Wrestling). Producto principal: banda de compresión con cámara POV integrada + análisis con IA.

Empresa: IKBATECH. Fundada en Guatemala. 
Founder: Diego Brito y hermano.
Co-founder & CTO: Rodrigo Rivera.

## Estructura del proyecto
Este repo es SOLO el sitio web (Next.js en la raíz, sin monorepo).
La app móvil y el backend viven en repos separados.
- `app/` → App Router de Next.js (páginas, componentes, API routes)
- `lib/` → Cliente de Supabase y utilidades compartidas
- `public/` → Imágenes y assets estáticos

## Stack tecnológico web
- Framework: Next.js 16 (App Router)
- Estilos: Tailwind CSS v4
- Animaciones: Framer Motion
- Fuentes: Bebas Neue (títulos) + Inter (cuerpo) — via next/font/google
- Base de datos: Supabase (PostgreSQL) — proyecto "roundiq"
- Deploy: Vercel (pendiente)
- Gestor de paquetes: pnpm (siempre usar pnpm, nunca npm)
- Terminal: siempre Git Bash, nunca PowerShell

## Secciones del sitio web (feature/landing-page)
1. Navbar — fijo, glass effect, cambia al scroll
2. HeroSection — imagen peleador, título Bebas Neue, scanner HUD, barra métricas
3. ComoFuncionaSection — 4 widgets click-to-expand con imágenes
4. DeviceSection — imagen dispositivo + tabs Camera/AI/Hardware con specs
5. MembresiasSection — Core $119 / Pursuit $149 / Apex $199
6. WaitlistSection — formulario 3 pasos conectado a Supabase
7. FAQSection — acordeón expandible
8. Footer — PENDIENTE (siguiente tarea)

## Base de datos Supabase
Tabla: waitlist
- id (uuid), email (text unique), deporte (text), rol (text), posicion (integer), created_at
- RLS activo: cualquiera puede insertar, nadie puede leer desde cliente
- API route: web/app/api/waitlist/route.ts usa SUPABASE_SERVICE_ROLE_KEY

## Variables de entorno (web/.env.local)
NEXT_PUBLIC_SUPABASE_URL=https://xrwajhzdewbzqyxydvcz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[clave anon]
SUPABASE_SERVICE_ROLE_KEY=[clave service role — secreta]

## Identidad visual
- Fondo principal: #0a0a0a
- Fondo secciones alternas: #111111
- Acento rojo: #e63329
- Texto: white con opacidades (/40, /30, /20 para jerarquía)
- Títulos: font-bebas (Bebas Neue)
- Cuerpo: font-inter (Inter)
- Sin bordes redondeados — estilo angular y tech
- Animaciones: Framer Motion, suaves, con peso

## Convenciones de código
- Siempre TypeScript, nunca JavaScript puro
- Componentes en PascalCase: HeroSection.tsx
- "use client" en todo componente con animaciones o estado
- Tailwind directo en JSX, sin CSS separado salvo globals.css
- Comentarios en español para que el fundador entienda
- NUNCA usar npm, siempre pnpm
- Usar las mejores tecnicas de ciberseguridad para proteger el sitio web. 
- NUNCA programar directo en main — siempre rama feature/

## Lo que NO hacer
- No usar any en TypeScript
- No hardcodear claves API (van en .env.local)
- No subir .env.local a GitHub
- No usar PowerShell (usar Git Bash)
- No instalar librerías sin consultar primero

## Siguiente tarea
Construir el Footer con: logo [roundIQ], tagline, logo IKBATECH, "Built in Guatemala 🇬🇹", links de redes sociales (Twitter/X, Instagram, TikTok), copyright 2025, links Privacy y Terms. Imagen de fondo sutil con opacidad baja.