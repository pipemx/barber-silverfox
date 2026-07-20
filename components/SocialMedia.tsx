"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { brand, gallery } from "@/lib/config";
import { Reveal, SectionHeading } from "./ui";

const luxe = [0.16, 1, 0.3, 1] as const;

function FacebookIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const cards = [
  {
    name: "Instagram",
    handle: brand.instagramHandle,
    href: brand.instagram,
    icon: InstagramIcon,
    cta: "Seguir en Instagram",
    text: "Cortes recientes, transformaciones y el día a día de la barbería.",
    accent: "from-[#f9ce34]/20 via-[#ee2a7b]/20 to-[#6228d7]/20",
  },
  {
    name: "Facebook",
    handle: "Barbería Silver Fox",
    href: brand.facebook,
    icon: FacebookIcon,
    cta: "Seguir en Facebook",
    text: "Promos, horarios y novedades. Únete a la comunidad Silver Fox.",
    accent: "from-[#1877f2]/25 via-[#1877f2]/10 to-transparent",
  },
];

/** Sección de redes sociales con mosaico de fotos recientes. */
export function SocialMedia() {
  const preview = gallery.slice(0, 4);
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 bg-ink-soft border-y border-line overflow-hidden">
      <div className="ambient-glow w-[400px] h-[400px] bg-violet/10 top-0 right-0" />
      <div className="mx-auto max-w-6xl relative">
        <SectionHeading
          kicker="Comunidad"
          title={
            <>
              Síguenos y mira el <span className="text-electric-gradient italic">antes que nadie</span>
            </>
          }
          subtitle="Publicamos cortes nuevos cada semana. Síguenos para inspirarte antes de tu próxima visita."
        />
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Tarjetas de redes */}
          <div className="flex flex-col gap-6">
            {cards.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.1} className="flex-1">
                <motion.a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: luxe }}
                  className="group relative h-full flex flex-col justify-between gap-6 rounded-3xl border border-line hover:border-ice/40 bg-surface p-7 md:p-8 overflow-hidden transition-colors duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative flex items-start justify-between">
                    <span className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-cream group-hover:text-ice-bright group-hover:scale-110 transition-all duration-300">
                      <c.icon className="w-7 h-7" />
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-stone-muted group-hover:text-ice group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" aria-hidden="true" />
                  </div>
                  <div className="relative">
                    <p className="font-display text-2xl md:text-3xl text-cream">{c.name}</p>
                    <p className="text-ice text-sm mt-0.5">{c.handle}</p>
                    <p className="text-sm text-stone-muted mt-3 leading-relaxed">{c.text}</p>
                    <span className="inline-flex items-center gap-1.5 mt-5 text-xs font-semibold uppercase tracking-wider text-ice group-hover:text-ice-bright transition-colors">
                      {c.cta}
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>

          {/* Mosaico estilo feed */}
          <Reveal delay={0.2}>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-2 gap-3 md:gap-4 h-full"
              aria-label={`Ver publicaciones recientes en Instagram ${brand.instagramHandle}`}
            >
              {preview.map((g, i) => (
                <div
                  key={g.src}
                  className="relative aspect-square rounded-2xl overflow-hidden border border-line group-hover:border-ice/30 transition-colors duration-300"
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {i === preview.length - 1 && (
                    <div className="absolute inset-0 bg-ink/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 text-cream">
                      <InstagramIcon className="w-8 h-8 text-ice" />
                      <span className="text-xs md:text-sm font-medium">Ver más en Instagram</span>
                    </div>
                  )}
                </div>
              ))}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
