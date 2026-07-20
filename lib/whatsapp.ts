import { brand } from "./config";

// Construye un enlace wa.me con mensaje pre-llenado.
export function waLink(message: string): string {
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  general: "Hola, me gustaría agendar una cita. 💈",
  info: "Hola, me gustaría información sobre sus servicios y precios. 💈",
  booking: (service: string, barber: string, date: string, time: string, name: string) =>
    `Hola Silver Fox 🦊 Quiero confirmar mi cita:\n\n✂️ Servicio: ${service}\n💈 Barbero: ${barber}\n📅 Fecha: ${date}\n🕐 Hora: ${time}\n👤 Nombre: ${name}\n\n¿Me confirman disponibilidad?`,
  bookingForm: (data: {
    name: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    comments?: string;
  }) =>
    `Hola Silver Fox 🦊 Quiero reservar una cita:\n\n👤 Nombre: ${data.name}\n📱 Teléfono: ${data.phone}\n✂️ Servicio: ${data.service}\n📅 Fecha: ${data.date}\n🕐 Hora: ${data.time}${
      data.comments?.trim() ? `\n📝 Comentarios: ${data.comments.trim()}` : ""
    }\n\n¿Me confirman disponibilidad?`,
  membership: "Hola Silver Fox 🦊 Me interesa el Club Silver Fox. ¿Me comparten los detalles?",
};
