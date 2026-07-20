"use client";

import { CalendarCheck, Armchair, Sparkles, Crown } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";

const steps = [
  {
    icon: CalendarCheck,
    title: "Reserva en 1 minuto",
    text: "Elige servicio, barbero y horario desde tu celular. Confirmación inmediata por WhatsApp. Tu silla queda bloqueada solo para ti.",
  },
  {
    icon: Armchair,
    title: "Llega y relájate",
    text: "Cero filas, cero espera. Llegas a Conkal, te recibe tu barbero y la silla ya es tuya. Aquí todos reciben trato VIP.",
  },
  {
    icon: Sparkles,
    title: "El ritual",
    text: "Consulta personalizada, corte de precisión, toalla caliente y detalle a navaja. Cada paso está pensado para que desconectes.",
  },
  {
    icon: Crown,
    title: "Sal siendo otro",
    text: "Styling final y tips para mantener tu look. Sales con corte firme, mirada fría y una seguridad que se nota desde lejos.",
  },
];

export function Experience() {
  return (
    <section id="experiencia" className="relative py-24 md:py-32 px-5 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="La experiencia"
          title={
            <>
              Un ritual, <span className="text-ice-gradient italic">no un trámite</span>
            </>
          }
          subtitle="Del primer clic al último vistazo en el espejo, cada paso está pensado para que tu visita sea el mejor momento de tu semana."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <div className="relative h-full bg-surface border border-line rounded-2xl p-7 flex flex-col gap-4 hover:border-ice/40 transition-colors duration-300">
                <span className="absolute top-5 right-6 font-display text-5xl text-ice/10 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-12 h-12 rounded-xl bg-ice/10 border border-ice/25 flex items-center justify-center">
                  <s.icon className="w-6 h-6 text-ice" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg md:text-xl text-cream">{s.title}</h3>
                <p className="text-sm text-stone-muted leading-relaxed">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
