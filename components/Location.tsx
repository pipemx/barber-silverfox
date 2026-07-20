"use client";

import { MapPin, Clock, Phone, Navigation, Mail } from "lucide-react";
import { brand, hours } from "@/lib/config";
import { GlowButton, Reveal, SectionHeading } from "./ui";

export function Location() {
  return (
    <section id="ubicacion" className="relative py-24 md:py-32 px-5 md:px-8 bg-ink-soft border-t border-line">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Visítanos"
          title={
            <>
              Estamos en <span className="text-ice-gradient italic">{brand.city}</span>,{" "}
              a minutos de {brand.metro}
            </>
          }
          subtitle="Búscanos en Google Maps como Barbería Silver Fox. Toca el botón y llega directo a la silla."
        />
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mapa de Google real */}
          <Reveal>
            <div className="relative h-80 lg:h-full min-h-80 rounded-2xl overflow-hidden border border-line hover:border-ice/40 transition-colors duration-300">
              <iframe
                src={brand.mapsEmbed}
                title={`Ubicación de Barbería ${brand.name} en Google Maps`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0 grayscale-[25%] contrast-[1.05] hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-4 left-4 pointer-events-none">
                <span className="glass rounded-full px-4 py-2 flex items-center gap-2 text-xs text-cream">
                  <MapPin className="w-3.5 h-3.5 text-ice" aria-hidden="true" />
                  Barbería {brand.name} · {brand.city}, {brand.state}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col gap-4 h-full">
              <div className="bg-surface border border-line rounded-2xl p-6 md:p-7 flex-1">
                <h3 className="flex items-center gap-2 font-display text-xl text-cream mb-4">
                  <Clock className="w-5 h-5 text-ice" aria-hidden="true" />
                  Horarios
                </h3>
                <ul className="flex flex-col gap-3">
                  {hours.map((h) => (
                    <li
                      key={h.days}
                      className="flex items-center justify-between text-sm md:text-base border-b border-line/50 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-stone-muted">{h.days}</span>
                      <span className="text-cream tabular-nums">
                        {h.open} — {h.close}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href={`tel:${brand.phone.replace(/\s/g, "")}`}
                  className="bg-surface border border-line hover:border-ice/40 rounded-2xl p-6 flex items-start gap-3 transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 text-ice shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-cream">{brand.phone}</p>
                    <p className="text-xs text-stone-muted mt-1">Llámanos o escríbenos</p>
                  </div>
                </a>
                <a
                  href={`mailto:${brand.email}`}
                  className="bg-surface border border-line hover:border-ice/40 rounded-2xl p-6 flex items-start gap-3 transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 text-ice shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-cream break-all">{brand.email}</p>
                    <p className="text-xs text-stone-muted mt-1">Correo de contacto</p>
                  </div>
                </a>
              </div>
              <GlowButton href={brand.mapsUrl} className="w-full">
                <Navigation className="w-4 h-4" />
                Cómo llegar
              </GlowButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
