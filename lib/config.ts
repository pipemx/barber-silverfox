// ============================================================
// CONFIGURACIÓN WHITE-LABEL — BarberOS
// Marca activa: BARBERÍA SILVER FOX · Conkal, Yucatán
// "Corte firme, mirada fría."
// ============================================================

export const brand = {
  name: "SILVER FOX",
  tagline: "Barbería",
  slogan: "Corte firme, mirada fría",
  city: "Conkal",
  metro: "Mérida", // zona metropolitana, para SEO local
  state: "Yucatán",
  neighborhood: "Conkal",
  whatsapp: "5219996395874",
  phone: "+52 999 639 5874",
  email: "silverfoxconkal@icloud.com",
  address: "Conkal, Yucatán, México",
  mapsUrl: "https://maps.app.goo.gl/cLzuVjvkz29mdCPg6",
  mapsEmbed:
    "https://www.google.com/maps?q=Barber%C3%ADa+Silver+Fox+Conkal+Yucat%C3%A1n&z=16&hl=es&output=embed",
  geo: { lat: 21.0721544, lng: -89.5213496 },
  facebook: "https://www.facebook.com/TheRazoBarber",
  instagram: "https://www.instagram.com/barberiasilverfox/",
  instagramHandle: "@barberiasilverfox",
  rating: 5.0,
  // TODO: actualizar conforme crezcan las reseñas reales en Google/Facebook
  reviewCount: 120,
  yearsOpen: 5,
  clientsServed: 2500,
};

export const hours = [
  // TODO: confirmar horarios reales con la barbería
  { days: "Lunes a Viernes", open: "10:00", close: "20:00" },
  { days: "Sábado", open: "9:00", close: "20:00" },
  { days: "Domingo", open: "10:00", close: "15:00" },
];

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutos
  featured?: boolean;
  badge?: string;
};

// TODO: confirmar precios reales con la barbería
export const services: Service[] = [
  {
    id: "corte-clasico",
    name: "Corte Clásico",
    description:
      "Corte de precisión a tu medida: máquina, tijera y acabado con detalle. Sales listo para todo.",
    price: 150,
    duration: 45,
  },
  {
    id: "taper-fade",
    name: "Taper / Fade Silver",
    description:
      "Degradado limpio, fresco y con estilo. El sello de la casa: líneas firmes y acabado de espejo.",
    price: 180,
    duration: 50,
    featured: true,
    badge: "El favorito",
  },
  {
    id: "corte-barba",
    name: "Corte + Barba",
    description:
      "El combo completo: corte de precisión, perfilado de barba con navaja y toalla caliente.",
    price: 250,
    duration: 75,
    badge: "Trato VIP",
  },
  {
    id: "barba-ritual",
    name: "Ritual de Barba",
    description:
      "Perfilado con navaja, toalla caliente y aceites para que tu barba hable por ti.",
    price: 120,
    duration: 30,
  },
  {
    id: "experiencia-silver",
    name: "Experiencia Silver Fox",
    description:
      "Corte + barba + facial + mascarilla negra. Una hora y media dedicada a tu mejor versión.",
    price: 350,
    duration: 90,
    badge: "Consiéntete",
  },
  {
    id: "corte-junior",
    name: "Corte Junior",
    description:
      "Para los futuros zorros de la casa. Misma precisión, paciencia extra y trato especial.",
    price: 120,
    duration: 30,
  },
];

export type Barber = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  initials: string;
  photo?: string;
};

// TODO: reemplazar nombres y fotos con el equipo real de Silver Fox
export const barbers: Barber[] = [
  {
    id: "cualquiera",
    name: "Sin preferencia",
    role: "El primero disponible",
    specialty: "Te asignamos al mejor barbero disponible",
    experience: "",
    initials: "SF",
  },
  {
    id: "razo",
    name: "Razo",
    role: "Master Barber · Fundador",
    specialty: "Taper fades de precisión y estilo urbano",
    experience: "8 años",
    initials: "RZ",
    photo: "/images/barber-marco.jpg",
  },
  {
    id: "alexis",
    name: "Alexis",
    role: "Barber Profesional",
    specialty: "Barbas esculpidas y navaja tradicional",
    experience: "5 años",
    initials: "AX",
    photo: "/images/barber-andres.jpg",
  },
  {
    id: "johan",
    name: "Johan",
    role: "Style Specialist",
    specialty: "Tendencias, texturas y diseños freestyle",
    experience: "4 años",
    initials: "JH",
    photo: "/images/barber-leon.jpg",
  },
];

// Galería — TODO: reemplazar con fotos reales de cortes y del local
export type GalleryItem = {
  src: string;
  alt: string;
  tall?: boolean;
};

export const gallery: GalleryItem[] = [
  { src: "/images/after-cut.png", alt: "Taper fade terminado en Silver Fox", tall: true },
  { src: "/images/shop-interior.jpg", alt: "Interior de la barbería Silver Fox" },
  { src: "/images/barber-marco.jpg", alt: "Barbero de Silver Fox trabajando", tall: true },
  { src: "/images/hero-bg.jpg", alt: "Ambiente de la barbería" },
  { src: "/images/barber-andres.jpg", alt: "Perfilado de barba con navaja" },
  { src: "/images/before-cut.png", alt: "Cliente antes de su transformación", tall: true },
  { src: "/images/barber-leon.jpg", alt: "Detalle de corte freestyle" },
];

export const testimonials = [
  {
    name: "Carlos P.",
    text: "Salí sintiéndome otro. El fade más limpio que me han hecho y sin pagar precios de plaza cara. En Conkal ya no hay que ir hasta Mérida para un corte de este nivel.",
    service: "Taper / Fade Silver",
    rating: 5,
  },
  {
    name: "Miguel A.",
    text: "Reservé por WhatsApp en un minuto. Llegué, cero espera, toalla caliente y un trato de primera. Aquí te atienden como VIP aunque solo vayas por un corte.",
    service: "Corte + Barba",
    rating: 5,
  },
  {
    name: "Jorge L.",
    text: "Llevé a mi hijo y ahora no quiere que le corte nadie más. Paciencia, buen trato y el corte quedó perfecto. Se nota que aman lo que hacen.",
    service: "Corte Junior",
    rating: 5,
  },
  {
    name: "Daniel R.",
    text: "La Experiencia Silver Fox vale cada peso: corte, barba, facial… salí con una confianza que no traía hace meses. Ya es mi ritual de cada quincena.",
    service: "Experiencia Silver Fox",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "¿Necesito agendar cita o puedo llegar directo?",
    a: "Puedes llegar directo, pero con cita garantizas tu lugar y cero espera. Reservar toma menos de 1 minuto por WhatsApp y tu horario queda apartado solo para ti.",
  },
  {
    q: "¿Dónde están ubicados exactamente?",
    a: "Estamos en Conkal, Yucatán, a unos minutos del norte de Mérida. Toca el botón de 'Cómo llegar' y Google Maps te trae directo a la silla.",
  },
  {
    q: "¿Qué pasa si necesito cancelar o mover mi cita?",
    a: "Sin problema: escríbenos por WhatsApp y reprogramamos tu cita sin costo. Solo avísanos con anticipación para liberar tu lugar.",
  },
  {
    q: "¿Cuánto dura una sesión?",
    a: "Un corte clásico toma unos 45 minutos y el combo corte + barba alrededor de 75. Nunca trabajamos con prisa: tu tiempo en la silla es tuyo.",
  },
  {
    q: "¿Cómo puedo pagar?",
    a: "Aceptamos efectivo y transferencia. Si tienes duda sobre algún método de pago, pregúntanos por WhatsApp antes de tu cita.",
  },
  {
    q: "¿Atienden a niños?",
    a: "¡Claro! El Corte Junior está pensado para ellos: misma precisión, paciencia extra y un trato que hace que quieran volver.",
  },
];

export const membership = {
  // TODO: confirmar precio y beneficios reales del club
  name: "Club Silver Fox",
  price: 299,
  regularValue: 390,
  perks: [
    "2 cortes premium al mes",
    "Prioridad para agendar tu cita",
    "Perfilado de ceja de cortesía",
    "10% de descuento en servicios extra",
    "Regalo de cumpleaños del club",
    "Acceso a promos exclusivas para miembros",
  ],
};

// Horarios disponibles que muestra el reservador (demo).
export const timeSlots = [
  "10:00", "10:45", "11:30", "12:15", "13:00", "13:45",
  "16:00", "16:45", "17:30", "18:15", "19:00", "19:45",
];
