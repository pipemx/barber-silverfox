"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { gallery } from "@/lib/config";
import { Reveal, SectionHeading } from "./ui";

const luxe = [0.16, 1, 0.3, 1] as const;

/** Galería masonry con lightbox, zoom y navegación por teclado. */
export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((a) => (a === null ? null : (a + gallery.length - 1) % gallery.length)),
    []
  );
  const next = useCallback(
    () => setActive((a) => (a === null ? null : (a + 1) % gallery.length)),
    []
  );

  // Teclado + bloqueo de scroll con el lightbox abierto.
  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", fn);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", fn);
    };
  }, [active, close, prev, next]);

  return (
    <section id="galeria" className="relative py-24 md:py-32 px-5 md:px-8">
      <div className="ambient-glow w-[400px] h-[400px] bg-ice/8 top-1/3 -left-40" />
      <div className="mx-auto max-w-6xl relative">
        <SectionHeading
          kicker="Galería"
          title={
            <>
              El trabajo habla <span className="text-ice-gradient italic">solo</span>
            </>
          }
          subtitle="Cortes reales, clientes reales. Esto es lo que sale de nuestras sillas todos los días."
        />
        {/* Masonry con CSS columns */}
        <div className="columns-2 md:columns-3 gap-4 md:gap-5 [column-fill:balance]">
          {gallery.map((item, i) => (
            <Reveal key={item.src} delay={(i % 3) * 0.08} className="mb-4 md:mb-5 break-inside-avoid">
              <motion.button
                onClick={() => setActive(i)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: luxe }}
                className={`group relative w-full overflow-hidden rounded-2xl border border-line hover:border-ice/50 cursor-zoom-in transition-colors duration-300 ${
                  item.tall ? "aspect-[3/4]" : "aspect-square"
                }`}
                aria-label={`Ampliar foto: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <ZoomIn className="w-5 h-5 text-ice" aria-hidden="true" />
                </span>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Galería ampliada"
          >
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: luxe }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-[4/3] md:aspect-[16/10]"
            >
              <Image
                src={gallery[active].src}
                alt={gallery[active].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />
              <p className="absolute -bottom-8 inset-x-0 text-center text-xs md:text-sm text-stone-muted">
                {gallery[active].alt} · {active + 1} / {gallery.length}
              </p>
            </motion.div>

            <button
              onClick={close}
              className="absolute top-5 right-5 w-11 h-11 rounded-full glass flex items-center justify-center text-cream hover:text-ice transition-colors cursor-pointer"
              aria-label="Cerrar galería"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass flex items-center justify-center text-cream hover:text-ice transition-colors cursor-pointer"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass flex items-center justify-center text-cream hover:text-ice transition-colors cursor-pointer"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
