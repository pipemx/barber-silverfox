import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Navigation } from "lucide-react";
import { locationLandings, serviceLandings } from "@/lib/seo-content";
import { brand } from "@/lib/config";
import { waLink, waMessages } from "@/lib/whatsapp";
import { SiteChrome } from "@/components/SiteChrome";
import { Reveal, SectionHeading, GlowButton, WhatsAppIcon } from "@/components/ui";

export function generateStaticParams() {
  return locationLandings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const landing = locationLandings.find((l) => l.slug === slug);
  if (!landing) return {};
  const url = `/ubicaciones/${landing.slug}`;
  return {
    title: landing.metaTitle,
    description: landing.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: landing.metaTitle,
      description: landing.metaDescription,
      url,
      type: "article",
    },
  };
}

export default async function LocationLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const landing = locationLandings.find((l) => l.slug === slug);
  if (!landing) notFound();

  const featuredServices = serviceLandings.slice(0, 4);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "/" },
      { "@type": "ListItem", position: 2, name: "Ubicaciones", item: "/ubicaciones" },
      { "@type": "ListItem", position: 3, name: landing.name, item: `/ubicaciones/${landing.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: landing.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="relative pt-32 md:pt-40 pb-24 px-5 md:px-8">
        <div className="mx-auto max-w-3xl">
          <nav className="flex items-center gap-2 text-xs text-stone-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ice transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/ubicaciones" className="hover:text-ice transition-colors">Ubicaciones</Link>
            <span>/</span>
            <span className="text-ice">{landing.name}</span>
          </nav>

          <SectionHeading
            kicker="Ubicaciones"
            title={<>{landing.h1}</>}
            subtitle={landing.intro}
            align="left"
          />

          <div className="flex flex-col gap-6 text-stone-muted leading-relaxed text-base md:text-lg mb-10">
            {landing.bodyParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="bg-surface border border-ice/25 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
              <div>
                <p className="font-display text-xl text-cream">
                  Barbería {brand.name} · {brand.city}, {brand.state}
                </p>
                <p className="text-sm text-stone-muted mt-1">
                  Nuestra única ubicación — sin sucursales adicionales.
                </p>
              </div>
              <GlowButton href={brand.mapsUrl}>
                <Navigation className="w-4 h-4" />
                Cómo llegar
              </GlowButton>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-cream mb-5">Preguntas frecuentes</h2>
            <div className="flex flex-col gap-4 mb-12">
              {landing.faqs.map((f) => (
                <div key={f.q} className="bg-ink-soft border border-line rounded-xl p-5">
                  <p className="flex items-start gap-2 text-cream font-medium text-sm md:text-base">
                    <Check className="w-4 h-4 text-ice shrink-0 mt-0.5" />
                    {f.q}
                  </p>
                  <p className="text-sm text-stone-muted mt-2 pl-6">{f.a}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-cream mb-5">Cortes más pedidos</h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-12">
              {featuredServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/servicios/${s.slug}`}
                  className="bg-surface border border-line hover:border-ice/40 rounded-xl px-5 py-4 text-cream text-sm font-medium transition-colors"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <GlowButton href={waLink(waMessages.interest(`la barbería cerca de ${landing.name}`))}>
              <WhatsAppIcon className="w-4 h-4" />
              Agendar por WhatsApp
            </GlowButton>
          </Reveal>
        </div>
      </main>
    </SiteChrome>
  );
}
