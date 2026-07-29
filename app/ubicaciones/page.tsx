import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { locationLandings } from "@/lib/seo-content";
import { brand } from "@/lib/config";
import { SiteChrome } from "@/components/SiteChrome";
import { Reveal, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: `Barbería en Mérida y Alrededores | Barbería ${brand.name} — Conkal`,
  description:
    "Silver Fox está en Conkal, Yucatán, y recibe clientes de Cholul, Mérida, Altabrisa, Montebello y Temozón Norte. Cortes de precisión y ritual de barba.",
  alternates: { canonical: "/ubicaciones" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "/" },
    { "@type": "ListItem", position: 2, name: "Ubicaciones", item: "/ubicaciones" },
  ],
};

export default function UbicacionesIndexPage() {
  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="relative pt-32 md:pt-40 pb-24 px-5 md:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            kicker="Ubicaciones"
            title={
              <>
                Barbería en <span className="text-ice-gradient italic">Conkal</span>, cerca de ti
              </>
            }
            subtitle="Tenemos una única sede en Conkal, Yucatán, y recibimos con gusto a clientes de las zonas cercanas de Mérida."
            align="left"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {locationLandings.map((l, i) => (
              <Reveal key={l.slug} delay={i * 0.05}>
                <Link
                  href={`/ubicaciones/${l.slug}`}
                  className="group flex flex-col gap-2 h-full bg-surface border border-line hover:border-ice/40 rounded-2xl p-6 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 font-display text-xl text-cream">
                      <MapPin className="w-4 h-4 text-ice" />
                      {l.name}
                    </h2>
                    <ArrowRight className="w-4 h-4 text-ice transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm text-stone-muted leading-relaxed">{l.intro}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </SiteChrome>
  );
}
