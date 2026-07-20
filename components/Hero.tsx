"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Star, MapPin, Clock, CalendarCheck, Users } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { brand, hours } from "@/lib/config";
import { waLink, waMessages } from "@/lib/whatsapp";
import { GlowButton, GhostButton, WhatsAppIcon } from "./ui";

const luxe = [0.16, 1, 0.3, 1] as const;

// Partículas con valores fijos (evita mismatch de hidratación SSR/cliente).
const particles = [
  { left: "6%", size: 5, duration: 16, delay: 0, opacity: 0.5, drift: "30px" },
  { left: "14%", size: 3, duration: 22, delay: 4, opacity: 0.35, drift: "-24px" },
  { left: "24%", size: 6, duration: 18, delay: 9, opacity: 0.55, drift: "18px" },
  { left: "33%", size: 4, duration: 25, delay: 2, opacity: 0.4, drift: "-32px" },
  { left: "45%", size: 3, duration: 20, delay: 12, opacity: 0.3, drift: "26px" },
  { left: "55%", size: 5, duration: 17, delay: 6, opacity: 0.5, drift: "-18px" },
  { left: "64%", size: 4, duration: 23, delay: 10, opacity: 0.45, drift: "34px" },
  { left: "73%", size: 6, duration: 19, delay: 1, opacity: 0.55, drift: "-28px" },
  { left: "82%", size: 3, duration: 24, delay: 14, opacity: 0.35, drift: "20px" },
  { left: "91%", size: 5, duration: 18, delay: 7, opacity: 0.5, drift: "-22px" },
];

export function Hero({ onBook }: { onBook: () => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease: luxe },
        };

  return (
    <section
      ref={ref}
      className="grain relative min-h-dvh flex flex-col items-center justify-center overflow-hidden px-5"
    >
      {/* Video de fondo: cuadro icónico del chango a la entrada de la barbería */}
      {reduce ? (
        <Image
          src="/images/hero-video-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover saturate-75 brightness-90"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-video-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover saturate-75 brightness-90"
          aria-hidden="true"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      )}
      {/* Luz ambiental: hielo eléctrico + violeta de profundidad */}
      <div className="ambient-glow w-[500px] h-[500px] bg-ice/15 -top-40 -left-40" />
      <div
        className="ambient-glow w-[420px] h-[420px] bg-violet/15 bottom-0 -right-32"
        style={{ animationDelay: "-9s" }}
      />
      {/* Viñeta azul-noche para legibilidad del texto sobre la foto */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,10,19,0.55)_0%,rgba(6,10,19,0.93)_100%)]" />

      {/* Chispas de hielo flotantes */}
      {!reduce && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {particles.map((p, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                ["--p-opacity" as string]: p.opacity,
                ["--p-drift" as string]: p.drift,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        style={reduce ? undefined : { y, opacity }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl pt-28 pb-32"
      >
        <motion.div
          {...enter(0.1)}
          className="glass rounded-full px-5 py-2 flex items-center gap-2 mb-8"
        >
          <span className="flex" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-ice text-ice" />
            ))}
          </span>
          <span className="text-xs md:text-sm text-stone-muted">
            Clientes satisfechos en {brand.city} y {brand.metro}
          </span>
        </motion.div>

        <motion.h1
          {...enter(0.25)}
          className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.95] text-cream"
        >
          Corte firme.
          <br />
          <span className="text-ice-gradient">Mirada fría.</span>
        </motion.h1>

        <motion.p
          {...enter(0.45)}
          className="mt-6 md:mt-8 text-base md:text-xl text-stone-muted max-w-2xl leading-relaxed"
        >
          En {brand.city} hay un lugar donde no solo te cortan el cabello:
          <span className="text-cream"> te devuelven la seguridad</span>. Trato
          VIP a precio justo, para que salgas siendo la mejor versión de ti.
        </motion.p>

        <motion.div
          {...enter(0.65)}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <GlowButton onClick={onBook} className="w-full sm:w-auto">
            <CalendarCheck className="w-4 h-4" />
            Reservar cita
          </GlowButton>
          <GhostButton href={waLink(waMessages.general)} className="w-full sm:w-auto">
            <WhatsAppIcon className="w-4 h-4 text-whatsapp" />
            Enviar WhatsApp
          </GhostButton>
        </motion.div>

        {/* Datos inmediatos: clientes · horario · ubicación */}
        <motion.div
          {...enter(0.85)}
          className="mt-9 flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm text-stone-muted"
        >
          <span className="glass rounded-full px-4 py-2 flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-ice" aria-hidden="true" />
            +{brand.clientsServed.toLocaleString("es-MX")} clientes satisfechos
          </span>
          <span className="glass rounded-full px-4 py-2 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-ice" aria-hidden="true" />
            {hours[0].days} · {hours[0].open}–{hours[0].close}
          </span>
          <a
            href={brand.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-full px-4 py-2 flex items-center gap-2 hover:text-ice-bright transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-ice" aria-hidden="true" />
            {brand.city}, {brand.state}
          </a>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full border border-line flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-2 rounded-full bg-ice"
            animate={reduce ? {} : { y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
