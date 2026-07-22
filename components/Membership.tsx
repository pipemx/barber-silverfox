"use client";

import { Check, Crown } from "lucide-react";
import { membershipPlans, membershipPerks } from "@/lib/config";
import { waLink, waMessages } from "@/lib/whatsapp";
import { GlowButton, Reveal, SectionHeading, WhatsAppIcon } from "./ui";

export function Membership() {
  return (
    <section
      id="membresia"
      className="relative py-24 md:py-32 px-5 md:px-8 bg-ink-soft border-y border-line overflow-hidden"
    >
      <div className="ambient-glow w-[500px] h-[500px] bg-ice/12 top-1/4 left-1/2 -translate-x-1/2" />
      <div className="mx-auto max-w-5xl relative">
        <SectionHeading
          kicker="Club Silver Fox"
          title={
            <>
              Tu imagen, siempre <span className="text-ice-gradient italic">impecable</span>
            </>
          }
          subtitle="Elige el paquete que más te acomode: 2 servicios al mes por un precio fijo, sin plazos forzosos."
        />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {membershipPlans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.1}>
              <div
                className={`relative h-full flex flex-col glass rounded-3xl p-8 md:p-10 ${
                  plan.featured ? "border border-ice/40 shadow-glow-ice" : "border border-line"
                }`}
              >
                <div
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-6 py-1.5 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                    plan.featured ? "btn-shimmer text-onbrand" : "bg-surface-2 border border-line text-ice"
                  }`}
                >
                  <Crown className="w-3.5 h-3.5" aria-hidden="true" />
                  {plan.name}
                </div>

                <div className="flex flex-col gap-1 mb-2 pt-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-5xl md:text-6xl text-ice-gradient tabular-nums">
                      ${plan.price}
                    </span>
                    <span className="text-stone-muted text-sm">/ mes</span>
                  </div>
                  <p className="text-xs text-ice uppercase tracking-widest font-semibold">
                    2 servicios al mes
                  </p>
                </div>

                <p className="text-xs text-stone-muted uppercase tracking-widest mb-6">
                  Sin plazos forzosos · Cancela cuando quieras
                </p>

                <p className="text-xs text-stone-muted uppercase tracking-widest mb-3">
                  Cada visita incluye
                </p>
                <ul className="flex flex-col gap-2.5 mb-6">
                  {plan.services.map((service) => (
                    <li key={service} className="flex items-start gap-3 text-sm md:text-base text-cream/90">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-ice/15 border border-ice/30 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-ice" aria-hidden="true" />
                      </span>
                      {service}
                    </li>
                  ))}
                </ul>

                <div className="ice-line w-full mb-6" />

                <p className="text-xs text-stone-muted uppercase tracking-widest mb-3">
                  Beneficios de socio
                </p>
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {membershipPerks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm md:text-base text-cream/90">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-ice/15 border border-ice/30 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-ice" aria-hidden="true" />
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>

                <GlowButton href={waLink(waMessages.membership(plan.name))} className="w-full">
                  <WhatsAppIcon className="w-4 h-4" />
                  Quiero el {plan.name}
                </GlowButton>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
