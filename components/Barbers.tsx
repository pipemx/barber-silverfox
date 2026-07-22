"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import Image from "next/image";
import { barbers, receptionist } from "@/lib/config";
import { Reveal, SectionHeading } from "./ui";

export function Barbers({ onBook }: { onBook: (barberId: string) => void }) {
  const team = barbers.filter((b) => b.id !== "cualquiera");
  return (
    <section id="barberos" className="relative py-24 md:py-32 px-5 md:px-8 bg-ink-soft border-y border-line overflow-hidden">
      <div className="ambient-glow w-[350px] h-[350px] bg-ice/8 top-20 right-0" />
      <div className="mx-auto max-w-6xl relative">
        <SectionHeading
          kicker="El equipo"
          title={
            <>
              El equipo detrás de tu <span className="text-ice-gradient italic">mejor versión</span>
            </>
          }
          subtitle="Manos firmes y trato de casa. Cada persona de Silver Fox pone lo suyo para que tu visita sea la mejor parte de tu semana."
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {team.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-surface border border-line hover:border-ice/40 rounded-2xl overflow-hidden transition-colors duration-300"
              >
                <div className="relative h-64 md:h-72 bg-gradient-to-br from-surface-2 via-ink-soft to-ink overflow-hidden">
                  {b.photo ? (
                    <Image
                      src={b.photo}
                      alt={`${b.name}, ${b.role}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(76,195,255,0.12),transparent_60%)]" />
                      <span className="font-display text-6xl md:text-7xl text-ice/30 group-hover:text-ice/50 transition-colors duration-500 tracking-widest">
                        {b.initials}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-surface to-transparent" />
                </div>
                <div className="p-6 md:p-7 flex flex-col gap-3">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl text-cream">{b.name}</h3>
                    <p className="text-ice text-xs uppercase tracking-[0.2em] mt-1">{b.role}</p>
                  </div>
                  <p className="text-sm text-stone-muted leading-relaxed">{b.specialty}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-line/60">
                    {b.experience ? (
                      <span className="flex items-center gap-1.5 text-xs text-stone-muted">
                        <Award className="w-3.5 h-3.5 text-ice" />
                        {b.experience} de experiencia
                      </span>
                    ) : (
                      <span />
                    )}
                    <button
                      onClick={() => onBook(b.id)}
                      className="text-xs font-semibold uppercase tracking-wider text-ice hover:text-ice-bright transition-colors cursor-pointer"
                    >
                      Agendar con {b.name.split(" ")[0]}
                    </button>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}

          {/* Recepcionista: mismo trato visual, sin botón de reservar
              (no aplica agendar un corte "con" recepción). */}
          <Reveal delay={team.length * 0.1}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-surface border border-line hover:border-ice/40 rounded-2xl overflow-hidden transition-colors duration-300"
            >
              <div className="relative h-64 md:h-72 bg-gradient-to-br from-surface-2 via-ink-soft to-ink overflow-hidden">
                <Image
                  src={receptionist.photo}
                  alt={`${receptionist.name}, ${receptionist.role}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-surface to-transparent" />
              </div>
              <div className="p-6 md:p-7 flex flex-col gap-3">
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-cream">{receptionist.name}</h3>
                  <p className="text-ice text-xs uppercase tracking-[0.2em] mt-1">{receptionist.role}</p>
                </div>
                <p className="text-sm text-stone-muted leading-relaxed">
                  La primera cara amable que ves al llegar. Te acomoda, resuelve tus dudas y se asegura de que tu visita salga perfecta.
                </p>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
