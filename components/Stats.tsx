"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { brand } from "@/lib/config";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(target);
      return;
    }
    const duration = 1800;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("es-MX")}
      {suffix}
    </span>
  );
}

const stats = [
  { value: brand.clientsServed, suffix: "+", label: "Clientes atendidos" },
  { value: brand.yearsOpen, suffix: "", label: "Años de maestría" },
  { value: brand.reviewCount, suffix: "+", label: "Reseñas 5 estrellas" },
  { value: 98, suffix: "%", label: "Clientes que regresan" },
];

export function Stats() {
  return (
    <section className="relative border-y border-line bg-ink-soft">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-12 md:py-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center gap-1">
            <span className="font-display text-3xl md:text-5xl text-ice-gradient">
              <Counter target={s.value} suffix={s.suffix} />
            </span>
            <span className="text-xs md:text-sm text-stone-muted uppercase tracking-widest">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
