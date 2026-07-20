"use client";

import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import Image from "next/image";
import { Reveal, SectionHeading } from "./ui";

/**
 * Comparador antes/después con arrastre.
 * Ambos paneles usan fotos reales (before-cut.png / after-cut.png).
 */
function Comparator() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(92, Math.max(8, p)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full max-w-md md:max-w-lg mx-auto aspect-[4/5] rounded-2xl overflow-hidden border border-line select-none touch-pan-y cursor-ew-resize"
      onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
      onPointerDown={(e) => move(e.clientX)}
      role="slider"
      aria-label="Comparador antes y después"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(8, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(92, p + 4));
      }}
    >
      {/* Panel DESPUÉS (fondo) */}
      <div className="absolute inset-0">
        <Image
          src="/images/after-cut.png"
          alt="Después del corte"
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-cover"
          style={{ objectPosition: "50% 25%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <div className="absolute bottom-6 right-6 text-right">
          <p className="font-display text-2xl md:text-3xl text-ice-bright italic">Después</p>
          <p className="text-xs md:text-sm text-stone-muted mt-1 uppercase tracking-widest">
            Taper Fade Silver · Silver Fox
          </p>
        </div>
      </div>

      {/* Panel ANTES (recortado) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src="/images/before-cut.png"
          alt="Antes del corte"
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-cover grayscale-[30%]"
          style={{ objectPosition: "50% 25%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6">
          <p className="font-display text-2xl md:text-3xl text-cream">Antes</p>
        </div>
      </div>

      {/* Divisor */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-ice shadow-glow-ice"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full btn-shimmer flex items-center justify-center shadow-card">
          <MoveHorizontal className="w-5 h-5 text-ink" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 bg-ink-soft border-y border-line">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          kicker="Resultados"
          title={
            <>
              El espejo <span className="text-ice-gradient italic">no miente</span>
            </>
          }
          subtitle="Desliza para ver transformaciones reales de nuestros clientes. Sin filtros, sin retoques."
        />
        <Reveal>
          <Comparator />
        </Reveal>
      </div>
    </section>
  );
}
