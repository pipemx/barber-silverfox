"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { services, type Service } from "@/lib/config";
import { Reveal, SectionHeading } from "./ui";

function ServiceCard({
  service,
  index,
  onBook,
}: {
  service: Service;
  index: number;
  onBook: (serviceId: string) => void;
}) {
  const featured = service.featured;
  return (
    <Reveal delay={index * 0.08}>
      <motion.button
        onClick={() => onBook(service.id)}
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative w-full h-full text-left rounded-2xl p-7 md:p-8 cursor-pointer transition-shadow duration-300 flex flex-col gap-4 ${
          featured
            ? "bg-surface-2 border-2 border-ice/60 shadow-glow-ice"
            : "bg-surface border border-line hover:border-ice/40"
        }`}
        aria-label={`Reservar ${service.name}, $${service.price} pesos`}
      >
        {service.badge && (
          <span
            className={`absolute -top-3 left-6 rounded-full px-4 py-1 text-[11px] font-semibold uppercase tracking-widest ${
              featured ? "btn-shimmer text-onbrand" : "bg-ice-deep text-oncolor"
            }`}
          >
            {service.badge}
          </span>
        )}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl md:text-2xl text-cream">{service.name}</h3>
          <div className="text-right shrink-0">
            <span className="font-display text-2xl md:text-3xl text-ice-bright tabular-nums">
              ${service.price}
            </span>
          </div>
        </div>
        <p className="text-sm md:text-base text-stone-muted leading-relaxed flex-1">
          {service.description}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-line/60">
          <span className="flex items-center gap-1.5 text-xs text-stone-muted">
            <Clock className="w-3.5 h-3.5 text-ice" />
            {service.duration} min
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ice group-hover:text-ice-bright transition-colors">
            Reservar
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </motion.button>
    </Reveal>
  );
}

export function Services({ onBook }: { onBook: (serviceId: string) => void }) {
  return (
    <section id="servicios" className="relative py-24 md:py-32 px-5 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Servicios"
          title={
            <>
              Precisión que se <span className="text-ice-gradient italic">nota</span>
            </>
          }
          subtitle="Trato VIP a precio justo: consulta personalizada, productos de calidad y el tiempo que mereces. Sin prisas, sin filas."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} onBook={onBook} />
          ))}
        </div>
      </div>
    </section>
  );
}
