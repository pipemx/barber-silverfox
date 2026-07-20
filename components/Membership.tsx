"use client";

import { Check, Crown } from "lucide-react";
import { membership } from "@/lib/config";
import { waLink, waMessages } from "@/lib/whatsapp";
import { GlowButton, Reveal, SectionHeading, WhatsAppIcon } from "./ui";

export function Membership() {
  const savings = membership.regularValue - membership.price;
  return (
    <section
      id="membresia"
      className="relative py-24 md:py-32 px-5 md:px-8 bg-ink-soft border-y border-line overflow-hidden"
    >
      <div className="ambient-glow w-[500px] h-[500px] bg-ice/12 top-1/4 left-1/2 -translate-x-1/2" />
      <div className="mx-auto max-w-4xl relative">
        <SectionHeading
          kicker="Club Silver Fox"
          title={
            <>
              Tu imagen, siempre <span className="text-ice-gradient italic">impecable</span>
            </>
          }
          subtitle="Para quien no deja su imagen al azar: cortes premium todo el mes por menos de lo que imaginas."
        />
        <Reveal>
          <div className="relative glass rounded-3xl border border-ice/30 p-8 md:p-12 shadow-glow-ice">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 btn-shimmer text-ink rounded-full px-6 py-1.5 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5" aria-hidden="true" />
              {membership.name}
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pt-4">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-5xl md:text-6xl text-ice-gradient tabular-nums">
                    ${membership.price}
                  </span>
                  <span className="text-stone-muted text-sm">/ mes</span>
                </div>
                <p className="text-sm text-stone-muted mt-2">
                  Valor real:{" "}
                  <span className="line-through">${membership.regularValue}</span>{" "}
                  <span className="text-ice-bright font-semibold">
                    Ahorras ${savings} cada mes
                  </span>
                </p>
              </div>
              <p className="text-xs text-stone-muted uppercase tracking-widest">
                Sin plazos forzosos · Cancela cuando quieras
              </p>
            </div>

            <ul className="grid sm:grid-cols-2 gap-3.5 mb-10">
              {membership.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-sm md:text-base text-cream/90">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-ice/15 border border-ice/30 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-ice" aria-hidden="true" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <GlowButton href={waLink(waMessages.membership)} className="w-full sm:w-auto">
                <WhatsAppIcon className="w-4 h-4" />
                Quiero ser miembro
              </GlowButton>
              <p className="text-xs text-stone-muted text-center sm:text-left">
                Quedan pocos lugares este mes. Respuesta en menos de 10 minutos.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
