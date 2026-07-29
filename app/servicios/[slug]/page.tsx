import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Check } from "lucide-react";
import { serviceLandings } from "@/lib/seo-content";
import { brand, services } from "@/lib/config";
import { waLink, waMessages } from "@/lib/whatsapp";
import { SiteChrome } from "@/components/SiteChrome";
import { Reveal, SectionHeading, GlowButton, WhatsAppIcon } from "@/components/ui";

export function generateStaticParams() {
  return serviceLandings.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const landing = serviceLandings.find((s) => s.slug === slug);
  if (!landing) return {};
  const url = `/servicios/${landing.slug}`;
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

export default async function ServiceLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const landing = serviceLandings.find((s) => s.slug === slug);
  if (!landing) notFound();

  const service = services.find((s) => s.id === landing.serviceId);
  const related = landing.relatedSlugs
    .map((slug) => serviceLandings.find((s) => s.slug === slug))
    .filter((s): s is (typeof serviceLandings)[number] => Boolean(s));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "/" },
      { "@type": "ListItem", position: 2, name: "Servicios", item: "/servicios" },
      { "@type": "ListItem", position: 3, name: landing.name, item: `/servicios/${landing.slug}` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: landing.name,
    description: landing.metaDescription,
    provider: {
      "@type": "BarberShop",
      name: `Barbería ${brand.name}`,
    },
    areaServed: { "@type": "City", name: brand.city },
    ...(service
      ? {
          offers: {
            "@type": "Offer",
            price: service.price,
            priceCurrency: "MXN",
          },
        }
      : {}),
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
    <SiteChrome initialServiceId={landing.serviceId}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
            <Link href="/servicios" className="hover:text-ice transition-colors">Servicios</Link>
            <span>/</span>
            <span className="text-ice">{landing.name}</span>
          </nav>

          <SectionHeading
            kicker="Servicios"
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

          {service && (
            <Reveal>
              <div className="bg-surface border border-ice/25 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
                <div>
                  <p className="font-display text-2xl text-cream">{service.name}</p>
                  <p className="flex items-center gap-1.5 text-sm text-stone-muted mt-1">
                    <Clock className="w-3.5 h-3.5 text-ice" /> {service.duration} min
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-display text-3xl text-ice-bright tabular-nums">
                    ${service.price}
                  </span>
                  <a
                    href={waLink(waMessages.interest(landing.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full py-3 px-6 bg-whatsapp text-onbrand font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Agendar
                  </a>
                </div>
              </div>
            </Reveal>
          )}

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

          {related.length > 0 && (
            <Reveal>
              <h2 className="font-display text-2xl text-cream mb-5">Otros cortes que te pueden interesar</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-12">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/servicios/${r.slug}`}
                    className="group flex items-center justify-between gap-3 bg-surface border border-line hover:border-ice/40 rounded-xl px-5 py-4 transition-colors"
                  >
                    <span className="text-cream text-sm font-medium">{r.name}</span>
                    <ArrowRight className="w-4 h-4 text-ice transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal>
            <GlowButton href={waLink(waMessages.interest(landing.name))}>
              <WhatsAppIcon className="w-4 h-4" />
              Agendar por WhatsApp
            </GlowButton>
          </Reveal>
        </div>
      </main>
    </SiteChrome>
  );
}
