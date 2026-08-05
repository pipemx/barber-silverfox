import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Jost } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { brand, hours, services, faqs, siteUrl, gtmId } from "@/lib/config";

// Aplica el tema guardado ANTES de pintar la página (evita el flash del
// tema equivocado). beforeInteractive lo inyecta en <head> y lo corre
// antes de la hidratación.
const themeInitScript = `
(function () {
  try {
    var t = localStorage.getItem("theme");
    if (t !== "light" && t !== "dark") t = "dark";
    document.documentElement.setAttribute("data-theme", t);
  } catch (e) {}
})();
`;

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `Barbería ${brand.name} · Barbería en ${brand.city}, ${brand.metro} | ${brand.slogan}`,
  description: `Barbería en ${brand.city}, ${brand.metro}, ${brand.state}. Taper fades, cortes de precisión y ritual de barba con trato VIP a precio justo. ${brand.slogan}. Agenda tu cita por WhatsApp en menos de 1 minuto.`,
  keywords: [
    `barbería en ${brand.city}`,
    `barbería en ${brand.metro}`,
    "barbería cerca de mí",
    `corte de cabello en ${brand.city}`,
    `barber shop ${brand.metro}`,
    "taper fade Conkal",
    "corte de cabello hombre Yucatán",
    "barba navaja toalla caliente",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `Barbería ${brand.name} · ${brand.slogan}`,
    description: `Cortes firmes y trato VIP a precio justo en ${brand.city}, ${brand.metro}. Agenda por WhatsApp.`,
    type: "website",
    locale: "es_MX",
    siteName: `Barbería ${brand.name}`,
    images: [
      {
        url: "/images/og-silverfox.jpg",
        width: 1200,
        height: 1198,
        alt: `Logotipo de Barbería ${brand.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Barbería ${brand.name} · ${brand.slogan}`,
    description: `Barbería en ${brand.city}, ${brand.metro}. Agenda tu cita por WhatsApp.`,
    images: ["/images/og-silverfox.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#060a13",
};

// schema.org exige los días en inglés (Monday…Sunday), no rangos en texto libre
// como "Lunes a Viernes" — si no, Google no puede leer el horario en Maps/rich results.
const dayOfWeekMap: Record<string, string[]> = {
  "Lunes a Viernes": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "Sábado": ["Saturday"],
  "Domingo": ["Sunday"],
};

const schema = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: `Barbería ${brand.name}`,
  slogan: brand.slogan,
  image: "/images/og-silverfox.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: brand.city,
    addressRegion: brand.state,
    addressCountry: "MX",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: brand.geo.lat,
    longitude: brand.geo.lng,
  },
  hasMap: brand.mapsUrl,
  telephone: brand.phone,
  email: brand.email,
  sameAs: [brand.facebook, brand.instagram],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: brand.rating,
    reviewCount: brand.reviewCount,
    bestRating: 5,
    worstRating: 1,
  },
  openingHoursSpecification: hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: dayOfWeekMap[h.days] ?? h.days,
    opens: h.open,
    closes: h.close,
  })),
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de barbería",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
      },
      price: s.price,
      priceCurrency: "MXN",
    })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${bebas.variable} ${jost.variable} h-full antialiased`}
    >
      <GoogleTagManager gtmId={gtmId} />
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
