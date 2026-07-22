"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import Image from "next/image";
import { brand, hours } from "@/lib/config";
import { waLink, waMessages } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./ui";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink px-5 md:px-8 pt-16 pb-28 md:pb-16">
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/images/logo-silverfox.jpg"
            alt={`Logotipo de Barbería ${brand.name}`}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full border border-ice/30 object-cover logo-breathe"
          />
          <div>
            <p className="font-display text-4xl tracking-widest text-ice-gradient">{brand.name}</p>
            <p className="text-ice text-xs tracking-[0.4em] uppercase mt-1">{brand.tagline}</p>
            <p className="text-stone-muted text-xs italic mt-2">“{brand.slogan}”</p>
          </div>
        </div>

        <div className="ice-line w-40" />

        <div className="flex items-center gap-4">
          <a
            href={brand.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-stone-muted hover:text-ice hover:border-ice/50 hover:shadow-glow-ice transition-all duration-300"
          >
            <FacebookIcon />
          </a>
          <a
            href={brand.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-stone-muted hover:text-ice hover:border-ice/50 hover:shadow-glow-ice transition-all duration-300"
          >
            <InstagramIcon />
          </a>
          <a
            href={waLink(waMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-stone-muted hover:text-whatsapp hover:border-whatsapp/50 transition-colors duration-300"
          >
            <WhatsAppIcon />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs text-stone-muted">
          <a
            href={brand.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-ice transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-ice" aria-hidden="true" />
            {brand.city}, {brand.state} · Cómo llegar
          </a>
          <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-ice transition-colors">
            <Phone className="w-3.5 h-3.5 text-ice" aria-hidden="true" />
            {brand.phone}
          </a>
          <span className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-ice" aria-hidden="true" />
            {hours[0].days} · {hours[0].open}–{hours[0].close}
          </span>
        </div>

        <p className="text-xs text-stone-muted/60">
          © {new Date().getFullYear()} Barbería {brand.name}. Todos los derechos reservados.
          {" · "}
          Diseño por{" "}
          <a
            href="https://xinfinlab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ice transition-colors"
          >
            xinfinlab.com
          </a>
        </p>
      </div>
    </footer>
  );
}
