"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { gallery, results } from "@/lib/config";
import { Reveal, SectionHeading } from "./ui";

const luxe = [0.16, 1, 0.3, 1] as const;
const AUTOPLAY_MS = 4000;

/** Carrusel animado de cortes reales terminados, con autoplay y controles. */
function ResultsCarousel() {
  const reduce = useReducedMotion();
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => {
    setIndex(([i]) => [(i + dir + results.length) % results.length, dir]);
  }, []);

  useEffect(() => {
    if (reduce || paused) return;
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [reduce, paused, go]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/5] sm:aspect-[16/10] max-w-2xl mx-auto rounded-3xl border border-line bg-[#05070c] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: luxe }}
            className="absolute inset-0"
          >
            <Image
              src={results[index].src}
              alt={results[index].alt}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-contain"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider text-cream">
          {String(index + 1).padStart(2, "0")} / {String(results.length).padStart(2, "0")}
        </div>

        <button
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-cream hover:text-ice transition-colors cursor-pointer"
          aria-label="Corte anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-cream hover:text-ice transition-colors cursor-pointer"
          aria-label="Siguiente corte"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Puntos de navegación */}
      <div className="flex items-center justify-center gap-2 mt-5 flex-wrap max-w-md mx-auto">
        {results.map((r, i) => (
          <button
            key={r.src}
            onClick={() => setIndex([i, i > index ? 1 : -1])}
            aria-label={`Ver corte ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === index ? "w-6 bg-ice" : "w-2 bg-line hover:bg-ice/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/** Galería de instalaciones: masonry con lightbox, zoom y navegación por teclado. */
function InstallationsMasonry() {
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
    <>
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
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute top-4 left-4 rounded-full glass px-3 py-1 text-[11px] font-semibold tracking-wider text-cream opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {String(i + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </span>
              <p className="absolute bottom-4 left-4 right-14 text-xs md:text-sm text-cream opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 leading-snug">
                {item.alt}
              </p>
              <span className="absolute bottom-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <ZoomIn className="w-5 h-5 text-ice" aria-hidden="true" />
              </span>
            </motion.button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#05070c]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
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
              <p className="absolute -bottom-8 inset-x-0 text-center text-xs md:text-sm text-[#93a3bc]">
                {gallery[active].alt} · {active + 1} / {gallery.length}
              </p>
            </motion.div>

            <button
              onClick={close}
              className="absolute top-5 right-5 w-11 h-11 rounded-full glass-dark flex items-center justify-center text-[#f2f7fd] hover:text-[#4cc3ff] transition-colors cursor-pointer"
              aria-label="Cerrar galería"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-dark flex items-center justify-center text-[#f2f7fd] hover:text-[#4cc3ff] transition-colors cursor-pointer"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-dark flex items-center justify-center text-[#f2f7fd] hover:text-[#4cc3ff] transition-colors cursor-pointer"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Gallery() {
  return (
    <section id="galeria" className="relative py-24 md:py-32 px-5 md:px-8 overflow-hidden">
      <div className="ambient-glow w-[400px] h-[400px] bg-ice/8 top-1/3 -left-40" />
      <div className="mx-auto max-w-6xl relative">
        <SectionHeading
          kicker="Galería"
          title={
            <>
              El trabajo habla <span className="text-ice-gradient italic">solo</span>
            </>
          }
          subtitle="Cortes reales, clientes reales, y el lugar donde pasa todo. Esto es lo que sale de nuestras sillas todos los días."
        />

        <Reveal>
          <h3 className="font-display text-2xl md:text-3xl text-cream mb-8 text-center">
            Cortes que hablan <span className="text-electric-gradient italic">por sí solos</span>
          </h3>
        </Reveal>
        <ResultsCarousel />

        <div className="mt-20 md:mt-28">
          <Reveal>
            <h3 className="font-display text-2xl md:text-3xl text-cream mb-8 text-center">
              Nuestras <span className="text-electric-gradient italic">instalaciones</span>
            </h3>
          </Reveal>
          <InstallationsMasonry />
        </div>
      </div>
    </section>
  );
}
