import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Jost } from "next/font/google";
import "./globals.css";
import { brand, hours } from "@/lib/config";

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
  // TODO: reemplazar con el dominio real al publicar
  metadataBase: new URL("https://barberiasilverfox.com"),
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
  },
  openingHoursSpecification: hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.open,
    closes: h.close,
  })),
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${bebas.variable} ${jost.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
      </body>
    </html>
  );
}
