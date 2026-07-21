"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { brand } from "@/lib/config";

const SESSION_KEY = "sf-intro-shown";
const AUTO_DISMISS_MS = 4200;
const luxe = [0.16, 1, 0.3, 1] as const;

/**
 * Intro de bienvenida: el video del cuadro icónico + el logo, a pantalla
 * completa, antes de revelar la landing. Solo una vez por sesión de
 * navegador (sessionStorage) y se omite por completo con
 * prefers-reduced-motion, para no forzar la animación a quien no la quiere.
 */
export function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  const dismiss = () => {
    setShow(false);
    document.body.style.overflow = "";
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Sin sessionStorage disponible, la intro podría repetirse en otra
      // recarga; no es crítico, solo un detalle de pulido.
    }
  };

  useEffect(() => {
    let seen = true;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sessionStorage puede fallar en modo privado; en ese caso no repetimos
      // la intro dentro del mismo efecto (mejor no arriesgar un bucle).
    }
    if (seen || reduce) return;

    document.body.style.overflow = "hidden";
    setShow(true);
    const timer = setTimeout(dismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.7, ease: luxe } }}
          onClick={dismiss}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#05070c] cursor-pointer"
          role="dialog"
          aria-modal="true"
          aria-label={`Bienvenida a Barbería ${brand.name}`}
        >
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-video-poster.jpg"
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: luxe }}
            className="absolute inset-0 w-full h-full object-cover saturate-75 brightness-75"
            aria-hidden="true"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </motion.video>

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,7,12,0.5)_0%,rgba(5,7,12,0.9)_100%)]" />

          <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: luxe }}
              className="logo-breathe w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-[#4cc3ff]/40"
            >
              <Image
                src="/images/logo-silverfox.jpg"
                alt={`Barbería ${brand.name}`}
                width={200}
                height={200}
                priority
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: luxe }}
              className="flex flex-col items-center gap-1"
            >
              <p className="font-display text-3xl md:text-5xl tracking-[0.15em] text-[#f2f7fd]">
                {brand.name}
              </p>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#4cc3ff]">
                {brand.slogan}
              </p>
            </motion.div>
          </div>

          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            onClick={(e) => {
              e.stopPropagation();
              dismiss();
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:left-auto sm:right-8 sm:translate-x-0 text-xs uppercase tracking-[0.3em] text-[#93a3bc] hover:text-[#9fe6ff] transition-colors cursor-pointer"
          >
            Saltar intro
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
