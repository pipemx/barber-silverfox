"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { brand } from "@/lib/config";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#galeria", label: "Galería" },
  { href: "#barberos", label: "Barberos" },
  { href: "#reservar", label: "Reservar" },
  { href: "#ubicacion", label: "Ubicación" },
];

export function Navbar({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-card" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center gap-2.5 cursor-pointer" aria-label="Inicio">
          <Image
            src="/images/logo-silverfox.jpg"
            alt=""
            width={40}
            height={40}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-ice/30 object-cover"
          />
          <span className="flex items-baseline gap-2">
            <span className="font-display text-xl md:text-2xl tracking-widest text-ice-gradient">
              {brand.name}
            </span>
            <span className="text-ice text-[10px] md:text-xs tracking-[0.3em] uppercase">
              {brand.tagline}
            </span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm tracking-wide text-stone-muted hover:text-ice-bright transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={onBook}
            className="hidden sm:inline-flex btn-shimmer text-ink text-xs md:text-sm font-semibold uppercase tracking-wider rounded-full px-5 md:px-6 py-2.5 md:py-3 cursor-pointer transition-shadow hover:shadow-glow-ice"
          >
            Reservar cita
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-cream cursor-pointer"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden glass border-t border-line overflow-hidden"
          >
            <ul className="px-6 py-6 flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-lg text-cream hover:text-ice-bright transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <button
                  onClick={() => {
                    setOpen(false);
                    onBook();
                  }}
                  className="w-full btn-shimmer text-ink font-semibold uppercase tracking-wider rounded-full px-6 py-4 cursor-pointer"
                >
                  Reservar cita
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
