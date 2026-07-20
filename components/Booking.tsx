"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, Check, Clock, MessageSquare, Phone, User } from "lucide-react";
import { brand, services, timeSlots } from "@/lib/config";
import { waLink, waMessages } from "@/lib/whatsapp";
import { Reveal, SectionHeading, WhatsAppIcon } from "./ui";

const inputCls =
  "w-full rounded-xl bg-ink-soft border border-line focus:border-ice outline-none px-4 py-3.5 text-cream placeholder:text-stone-muted/50 transition-colors";

/** Sección de reservación directa: formulario → mensaje armado en WhatsApp. */
export function Booking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [comments, setComments] = useState("");

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const valid =
    name.trim().length >= 2 &&
    phone.trim().length >= 8 &&
    serviceId &&
    date &&
    time;

  const service = services.find((s) => s.id === serviceId);

  const url = valid
    ? waLink(
        waMessages.bookingForm({
          name: name.trim(),
          phone: phone.trim(),
          service: service ? `${service.name} · $${service.price}` : serviceId,
          date: new Date(`${date}T12:00:00`).toLocaleDateString("es-MX", {
            weekday: "long",
            day: "numeric",
            month: "long",
          }),
          time: `${time} hrs`,
          comments,
        })
      )
    : "#";

  return (
    <section id="reservar" className="relative py-24 md:py-32 px-5 md:px-8 overflow-hidden">
      <div className="ambient-glow w-[450px] h-[450px] bg-ice/10 top-10 -right-40" />
      <div className="ambient-glow w-[350px] h-[350px] bg-violet/10 bottom-0 -left-32" style={{ animationDelay: "-7s" }} />
      <div className="mx-auto max-w-6xl relative">
        <SectionHeading
          kicker="Reserva tu lugar"
          title={
            <>
              Tu silla te está <span className="text-ice-gradient italic">esperando</span>
            </>
          }
          subtitle="Llena el formulario y confirma por WhatsApp en segundos. Sin registros, sin pagos anticipados, sin complicaciones."
        />
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Panel lateral */}
          <Reveal className="lg:col-span-2">
            <div className="h-full glass rounded-3xl p-7 md:p-8 flex flex-col gap-6">
              <h3 className="font-display text-2xl md:text-3xl text-cream">
                Así de fácil es verte <span className="text-electric-gradient">increíble</span>
              </h3>
              <ul className="flex flex-col gap-4">
                {[
                  "Eliges servicio, fecha y hora",
                  "Confirmamos tu cita por WhatsApp",
                  "Llegas y tu silla ya es tuya: cero filas",
                  "Sales con un corte firme y la mirada fría",
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm md:text-base text-cream/90">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-ice/15 border border-ice/30 flex items-center justify-center shrink-0 font-display text-ice text-sm">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
              <div className="ice-line w-full" />
              <p className="text-sm text-stone-muted leading-relaxed">
                ¿Prefieres escribirnos directo? Manda mensaje al{" "}
                <a
                  href={waLink(waMessages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ice hover:text-ice-bright transition-colors font-medium"
                >
                  {brand.phone}
                </a>{" "}
                y te respondemos en minutos.
              </p>
            </div>
          </Reveal>

          {/* Formulario */}
          <Reveal delay={0.15} className="lg:col-span-3">
            <form
              className="bg-surface border border-line rounded-3xl p-7 md:p-9 flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                if (valid) window.open(url, "_blank", "noopener,noreferrer");
              }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="bk-name" className="flex items-center gap-1.5 text-xs text-stone-muted uppercase tracking-widest mb-2">
                    <User className="w-3.5 h-3.5 text-ice" aria-hidden="true" /> Nombre *
                  </label>
                  <input
                    id="bk-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="¿Cómo te llamamos?"
                    autoComplete="name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="bk-phone" className="flex items-center gap-1.5 text-xs text-stone-muted uppercase tracking-widest mb-2">
                    <Phone className="w-3.5 h-3.5 text-ice" aria-hidden="true" /> Teléfono *
                  </label>
                  <input
                    id="bk-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="999 123 4567"
                    autoComplete="tel"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bk-service" className="flex items-center gap-1.5 text-xs text-stone-muted uppercase tracking-widest mb-2">
                  <CalendarCheck className="w-3.5 h-3.5 text-ice" aria-hidden="true" /> Servicio *
                </label>
                <select
                  id="bk-service"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className={`${inputCls} appearance-none cursor-pointer ${serviceId ? "" : "text-stone-muted/50"}`}
                >
                  <option value="" disabled>
                    Elige tu servicio
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id} className="text-cream bg-ink-soft">
                      {s.name} — ${s.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="bk-date" className="flex items-center gap-1.5 text-xs text-stone-muted uppercase tracking-widest mb-2">
                    <CalendarCheck className="w-3.5 h-3.5 text-ice" aria-hidden="true" /> Fecha *
                  </label>
                  <input
                    id="bk-date"
                    type="date"
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`${inputCls} [color-scheme:dark] cursor-pointer`}
                  />
                </div>
                <div>
                  <label htmlFor="bk-time" className="flex items-center gap-1.5 text-xs text-stone-muted uppercase tracking-widest mb-2">
                    <Clock className="w-3.5 h-3.5 text-ice" aria-hidden="true" /> Hora *
                  </label>
                  <select
                    id="bk-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={`${inputCls} appearance-none cursor-pointer ${time ? "" : "text-stone-muted/50"}`}
                  >
                    <option value="" disabled>
                      Elige la hora
                    </option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t} className="text-cream bg-ink-soft">
                        {t} hrs
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="bk-comments" className="flex items-center gap-1.5 text-xs text-stone-muted uppercase tracking-widest mb-2">
                  <MessageSquare className="w-3.5 h-3.5 text-ice" aria-hidden="true" /> Comentarios
                </label>
                <textarea
                  id="bk-comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Opcional: cuéntanos qué estilo buscas o comparte una foto de referencia al confirmar."
                  rows={3}
                  className={`${inputCls} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={!valid}
                className="btn-shimmer text-ink font-semibold uppercase tracking-wider text-sm rounded-full py-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-glow-ice"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Reservar por WhatsApp
              </button>
              <p className="flex items-center justify-center gap-1.5 text-[11px] text-stone-muted text-center">
                <Check className="w-3.5 h-3.5 text-ice" aria-hidden="true" />
                Sin pago anticipado · Confirmación en minutos · Reprograma gratis
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
