import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceLandings } from "@/lib/seo-content";
import { brand } from "@/lib/config";
import { SiteChrome } from "@/components/SiteChrome";
import { Reveal, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: `Cortes y Servicios de Barbería en Conkal, Mérida | Barbería ${brand.name}`,
  description:
    "Guía completa de cortes y fades en Silver Fox: low fade, mid fade, high fade, skin fade, taper fade, burst fade y perfilado de barba. Conkal, Yucatán.",
  alternates: { canonical: "/servicios" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "/" },
    { "@type": "ListItem", position: 2, name: "Servicios", item: "/servicios" },
  ],
};

export default function ServiciosIndexPage() {
  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="relative pt-32 md:pt-40 pb-24 px-5 md:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            kicker="Servicios"
            title={
              <>
                Cortes y <span className="text-ice-gradient italic">guías de estilo</span>
              </>
            }
            subtitle="Cada corte tiene su propia página con detalle, precio y preguntas frecuentes. Elige el que buscas o descúbrelos todos."
            align="left"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {serviceLandings.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link
                  href={`/servicios/${s.slug}`}
                  className="group flex flex-col gap-2 h-full bg-surface border border-line hover:border-ice/40 rounded-2xl p-6 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-xl text-cream">{s.name}</h2>
                    <ArrowRight className="w-4 h-4 text-ice transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm text-stone-muted leading-relaxed">{s.intro}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </SiteChrome>
  );
}
