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

// Precios y servicios reales, tomados del letrero de la barbería.
export const services: Service[] = [
  {
    id: "corte-adulto",
    name: "Corte Adulto",
    description:
      "Corte de precisión a tu medida: máquina, tijera y acabado con detalle. Sales listo para todo.",
    price: 150,
    duration: 45,
    featured: true,
    badge: "El favorito",
  },
  {
    id: "corte-infantil",
    name: "Corte Infantil",
    description:
      "Para los futuros zorros de la casa. Misma precisión, paciencia extra y trato especial.",
    price: 120,
    duration: 30,
  },
  {
    id: "barba",
    name: "Barba",
    description:
      "Perfilado con navaja y toalla caliente para que tu barba hable por ti.",
    price: 120,
    duration: 30,
  },
  {
    id: "cejas",
    name: "Cejas",
    description: "Perfilado rápido y preciso para una mirada más definida.",
    price: 20,
    duration: 10,
  },
  {
    id: "mascarilla",
    name: "Mascarilla",
    description: "Limpieza facial que deja la piel fresca y renovada.",
    price: 60,
    duration: 20,
  },
  {
    id: "paquete-1",
    name: "Paquete 1 · Corte y Cejas",
    description: "El combo rápido: corte adulto más perfilado de cejas.",
    price: 150,
    duration: 55,
  },
  {
    id: "paquete-2",
    name: "Paquete 2 · Corte, Cejas y Mascarilla",
    description: "Corte, cejas y una mascarilla facial para salir renovado por completo.",
    price: 180,
    duration: 75,
    badge: "Trato VIP",
  },
  {
    id: "paquete-3",
    name: "Paquete 3 · Corte y Barba",
    description:
      "El combo completo: corte de precisión, perfilado de barba con navaja y toalla caliente.",
    price: 250,
    duration: 75,
  },
  {
    id: "paquete-silver-fox",
    name: "Paquete Silver Fox",
    description:
      "Corte, barba, cejas y mascarilla. La experiencia completa dedicada a tu mejor versión.",
    price: 280,
    duration: 90,
    badge: "Consiéntete",
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
    id: "alan",
    name: "Alan",
    role: "Barber",
    // TODO: confirmar especialidad y años de experiencia reales
    specialty: "Cortes de precisión y estilo personalizado",
    experience: "",
    initials: "AL",
    photo: "/images/barber-alan.jpg",
  },
  {
    id: "ricardo",
    name: "Ricardo",
    role: "Capitán · Barber Senior",
    specialty: "Fades y acabados de mano firme",
    experience: "",
    initials: "RC",
    photo: "/images/barber-ricardo.jpg",
  },
  {
    id: "tony",
    name: "Tony",
    role: "Barber",
    specialty: "Barbas esculpidas y navaja tradicional",
    experience: "",
    initials: "TN",
    photo: "/images/barber-tony.jpg",
  },
  {
    id: "eduardo",
    name: "Eduardo",
    role: "Barber",
    specialty: "Diseños freestyle y tendencias urbanas",
    experience: "",
    initials: "ED",
    photo: "/images/barber-eduardo.jpg",
  },
];

// Personal de recepción — se muestra junto al equipo de barberos pero no
// aparece como opción de barbero al reservar.
export type StaffMember = {
  name: string;
  role: string;
  photo: string;
};

export const receptionist: StaffMember = {
  name: "Isabella",
  role: "Recepcionista",
  photo: "/images/staff-isabella.jpg",
};

// Galería — fotos reales del local (silver1.jpg … silver8.jpg)
export type GalleryItem = {
  src: string;
  alt: string;
  tall?: boolean;
};

export const gallery: GalleryItem[] = [
  { src: "/images/silver1.jpg", alt: "Sala de espera de Silver Fox", tall: true },
  { src: "/images/silver2.jpg", alt: "Área de espera con ambientación de la barbería" },
  { src: "/images/silver3.jpg", alt: "Recepción de Silver Fox" },
  { src: "/images/silver4.jpg", alt: "Rincón con el poste de barbería clásico", tall: true },
  { src: "/images/silver5.jpg", alt: "Estaciones de corte de Silver Fox" },
  { src: "/images/silver6.jpg", alt: "Sillas de barbero listas para el siguiente cliente" },
  { src: "/images/silver7.jpg", alt: "Estación de Tony en Silver Fox", tall: true },
  { src: "/images/silver8.jpg", alt: "Estaciones de Alan y Ricardo en Silver Fox" },
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
