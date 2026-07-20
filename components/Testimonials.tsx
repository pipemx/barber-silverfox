"use client";

import { Star, Quote } from "lucide-react";
import { testimonials, brand } from "@/lib/config";
import { Reveal, SectionHeading } from "./ui";

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8">
      <div className="ambient-glow w-[400px] h-[400px] bg-ice/8 bottom-0 left-0" />
      <div className="mx-auto max-w-6xl relative">
        <SectionHeading
          kicker="Prueba social"
          title={
            <>
              {brand.reviewCount}+ hombres ya lo{" "}
              <span className="text-ice-gradient italic">confirmaron</span>
            </>
          }
          subtitle={`Calificación de ${brand.rating} estrellas en Google. Esto es lo que dicen después de sentarse en nuestras sillas.`}
        />
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="relative h-full bg-surface border border-line rounded-2xl p-7 md:p-8 flex flex-col gap-4 hover:border-ice/40 transition-colors duration-300">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-ice/15" aria-hidden="true" />
                <div className="flex" aria-label={`${t.rating} de 5 estrellas`}>
                  {[...Array(t.rating)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-ice text-ice" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-sm md:text-base text-cream/90 leading-relaxed flex-1">
                  “{t.text}”
                </blockquote>
                <figcaption className="flex items-center gap-3 pt-4 border-t border-line/60">
                  <span className="w-10 h-10 rounded-full bg-ice/10 border border-ice/25 flex items-center justify-center font-display text-ice text-sm">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-cream">{t.name}</p>
                    <p className="text-xs text-stone-muted">{t.service}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
