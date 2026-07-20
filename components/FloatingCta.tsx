"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { waLink, waMessages } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./ui";

/**
 * CTAs persistentes: botón WhatsApp flotante SIEMPRE visible y
 * barra inferior fija estilo app (móvil) que aparece tras pasar el hero.
 */
export function FloatingCta({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* WhatsApp flotante — siempre visible en todas las resoluciones */}
      <motion.a
        href={waLink(waMessages.general)}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed right-5 md:right-8 z-40 w-14 h-14 rounded-full bg-whatsapp text-ink flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] cursor-pointer hover:scale-110 transition-all duration-300 ${
          scrolled ? "bottom-24 md:bottom-8" : "bottom-8"
        }`}
        aria-label="Escribir por WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" />
        <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-20" aria-hidden="true" />
      </motion.a>

      {/* Barra inferior móvil — aparece tras pasar el hero */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="bar"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 inset-x-0 z-40 md:hidden glass border-t border-ice/20 px-5 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
          >
            <button
              onClick={onBook}
              className="w-full btn-shimmer text-ink font-semibold uppercase tracking-wider text-sm rounded-full py-4 flex items-center justify-center gap-2 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              Reservar cita ahora
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
