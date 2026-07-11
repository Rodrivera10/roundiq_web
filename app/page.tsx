"use client";
import { useEffect } from "react";  
import HeroSection from "@/app/components/HeroSection";
import Navbar from "@/app/components/Navbar";
import AppPreviewSection from "@/app/components/AppPreviewSection";
import MembresiasSec from "@/app/components/MembresiaSec";
import VisionSection from "@/app/components/VisionSection";
import ComoFuncionaSection from "@/app/components/ComoFuncionaSection"; 
import WaitlistSection from "@/app/components/WaitlistSection";
// import DeviceSection from "@/app/components/DeviceSection"; // deshabilitada — ver abajo
import FAQSection from "@/app/components/FAQSection";
import Footer from "@/app/components/Footer";


export default function HomePage() {
  // Al cargar la página, siempre ir al inicio
  // useEffect corre código después de que el componente se monta en pantalla
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <HeroSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <AppPreviewSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <MembresiasSec />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <VisionSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <ComoFuncionaSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* SECCIÓN "EL DISPOSITIVO" — DESHABILITADA TEMPORALMENTE.
          El componente sigue en app/components/DeviceSection.tsx.
          Para volver a activarla: descomenta el import de arriba y estas dos líneas. */}
      {/* <DeviceSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" /> */}

      <WaitlistSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <FAQSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      
      {/* Aquí irán las nuevas secciones cuando las construyamos */}
      <Footer />
    </main>
  );
  
}
