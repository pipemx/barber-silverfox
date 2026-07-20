"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, Clock, Check } from "lucide-react";
import { services, barbers, timeSlots } from "@/lib/config";
import { waLink, waMessages } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./ui";

const luxe = [0.16, 1, 0.3, 1] as const;

type Step = 0 | 1 | 2 | 3;
const stepTitles = ["Elige tu servicio", "Elige tu barbero", "Fecha y hora", "Confirma tu cita"];

/** Próximos 10 días para el selector (demo: la disponibilidad real vive en WhatsApp). */
function nextDays(count = 10) {
  const out: { iso: string; weekday: string; day: number; month: string }[] = [];
  const fmt = new Intl.DateTimeFormat("es-MX", { weekday: "short", month: "short" });
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const parts = fmt.formatToParts(d);
    out.push({
      iso: d.toLocaleDateString("es-MX", { day: "numeric", month: "long" }),
      weekday: parts.find((p) => p.type === "weekday")?.value ?? "",
      day: d.getDate(),
      month: parts.find((p) => p.type === "month")?.value ?? "",
    });
  }
  return out;
}

export function BookingModal({
  open,
  onClose,
  initialServiceId,
  initialBarberId,
}: {
  open: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialBarberId?: string;
}) {
  const [step, setStep] = useState<Step>(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [barberId, setBarberId] = useState<string | null>(null);
  const [dateIdx, setDateIdx] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");

  const days = useMemo(() => nextDays(), []);

  // Pre-selección al abrir desde una card de servicio o barbero.
  useEffect(() => {
    if (!open) return;
    if (initialServiceId) {
      setServiceId(initialServiceId);
      setStep(initialBarberId ? 2 : 1);
      if (initialBarberId) setBarberId(initialBarberId);
    } else if (initialBarberId) {
      setBarberId(initialBarberId);
      setStep(0);
    } else {
      setStep(0);
    }
  }, [open, initialServiceId, initialBarberId]);

  // Bloquear scroll del body con el modal abierto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Cerrar con Escape.
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  const service = services.find((s) => s.id === serviceId);
  const barber = barbers.find((b) => b.id === barberId);
  const date = dateIdx !== null ? days[dateIdx] : null;

  const canContinue =
    (step === 0 && serviceId) ||
    (step === 1 && barberId) ||
    (step === 2 && dateIdx !== null && time) ||
    (step === 3 && name.trim().length >= 2);

  const confirmUrl =
    service && barber && date && time && name.trim()
      ? waLink(waMessages.booking(service.name, barber.name, date.iso, time, name.trim()))
      : "#";

  const reset = () => {
    setStep(0);
    setServiceId(null);
    setBarberId(null);
    setDateIdx(null);
    setTime(null);
    setName("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-ink/80 backdrop-blur-sm p-0 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Reservar cita"
        >
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: luxe }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto bg-surface border border-ice/25 rounded-t-3xl sm:rounded-3xl shadow-card"
          >
            {/* Header */}
            <div className="sticky top-0 glass rounded-t-3xl px-6 py-5 flex items-center justify-between border-b border-line z-10">
              <div className="flex items-center gap-3">
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => (s - 1) as Step)}
                    className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-stone-muted hover:text-ice hover:border-ice/50 transition-colors cursor-pointer"
                    aria-label="Paso anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <p className="text-[10px] text-ice uppercase tracking-[0.25em]">
                    Paso {step + 1} de 4
                  </p>
                  <h2 className="font-display text-lg text-cream">{stepTitles[step]}</h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-stone-muted hover:text-cream transition-colors cursor-pointer"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Barra de progreso */}
            <div className="h-0.5 bg-line">
              <motion.div
                className="h-full bg-ice"
                animate={{ width: `${((step + 1) / 4) * 100}%` }}
                transition={{ duration: 0.4, ease: luxe }}
              />
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: luxe }}
                >
                  {step === 0 && (
                    <div className="flex flex-col gap-3">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setServiceId(s.id);
                            setStep(1);
                          }}
                          className={`flex items-center justify-between gap-4 rounded-xl border p-4 text-left cursor-pointer transition-colors duration-200 ${
                            serviceId === s.id
                              ? "border-ice bg-ice/10"
                              : "border-line bg-ink-soft hover:border-ice/40"
                          }`}
                        >
                          <div>
                            <p className="text-cream font-medium text-sm">{s.name}</p>
                            <p className="flex items-center gap-1.5 text-xs text-stone-muted mt-1">
                              <Clock className="w-3 h-3 text-ice" /> {s.duration} min
                            </p>
                          </div>
                          <span className="font-display text-xl text-ice-bright tabular-nums">
                            ${s.price}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="flex flex-col gap-3">
                      {barbers.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => {
                            setBarberId(b.id);
                            setStep(2);
                          }}
                          className={`flex items-center gap-4 rounded-xl border p-4 text-left cursor-pointer transition-colors duration-200 ${
                            barberId === b.id
                              ? "border-ice bg-ice/10"
                              : "border-line bg-ink-soft hover:border-ice/40"
                          }`}
                        >
                          <span className="w-11 h-11 rounded-full bg-ice/10 border border-ice/30 flex items-center justify-center font-display text-ice text-sm shrink-0">
                            {b.initials}
                          </span>
                          <div>
                            <p className="text-cream font-medium text-sm">{b.name}</p>
                            <p className="text-xs text-stone-muted mt-0.5">{b.role}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="flex flex-col gap-6">
                      <div>
                        <p className="text-xs text-stone-muted uppercase tracking-widest mb-3">
                          Fecha
                        </p>
                        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                          {days.map((d, i) => (
                            <button
                              key={d.iso}
                              onClick={() => setDateIdx(i)}
                              className={`shrink-0 w-16 rounded-xl border py-3 flex flex-col items-center gap-0.5 cursor-pointer transition-colors duration-200 ${
                                dateIdx === i
                                  ? "border-ice bg-ice/10"
                                  : "border-line bg-ink-soft hover:border-ice/40"
                              }`}
                            >
                              <span className="text-[10px] uppercase text-stone-muted">
                                {d.weekday}
                              </span>
                              <span className="font-display text-xl text-cream tabular-nums">
                                {d.day}
                              </span>
                              <span className="text-[10px] uppercase text-ice">{d.month}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-stone-muted uppercase tracking-widest mb-3">
                          Hora
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map((t) => (
                            <button
                              key={t}
                              onClick={() => setTime(t)}
                              className={`rounded-lg border py-2.5 text-sm tabular-nums cursor-pointer transition-colors duration-200 ${
                                time === t
                                  ? "border-ice bg-ice/10 text-ice-bright"
                                  : "border-line bg-ink-soft text-cream hover:border-ice/40"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => canContinue && setStep(3)}
                        disabled={!canContinue}
                        className="btn-shimmer text-ink font-semibold uppercase tracking-wider rounded-full py-4 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                      >
                        Continuar
                      </button>
                    </div>
                  )}

                  {step === 3 && service && barber && date && time && (
                    <div className="flex flex-col gap-5">
                      <div className="bg-ink-soft border border-ice/25 rounded-2xl p-5 flex flex-col gap-3">
                        {[
                          ["Servicio", `${service.name} · $${service.price}`],
                          ["Barbero", barber.name],
                          ["Fecha", date.iso],
                          ["Hora", `${time} hrs`],
                        ].map(([k, v]) => (
                          <div key={k} className="flex items-center justify-between text-sm">
                            <span className="text-stone-muted">{k}</span>
                            <span className="text-cream font-medium text-right">{v}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <label
                          htmlFor="booking-name"
                          className="block text-xs text-stone-muted uppercase tracking-widest mb-2"
                        >
                          Tu nombre *
                        </label>
                        <input
                          id="booking-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="¿Cómo te llamamos?"
                          autoComplete="name"
                          className="w-full rounded-xl bg-ink-soft border border-line focus:border-ice outline-none px-4 py-3.5 text-cream placeholder:text-stone-muted/50 transition-colors"
                        />
                        {name.trim().length > 0 && name.trim().length < 2 && (
                          <p className="text-xs text-red-400 mt-2">
                            Escribe al menos 2 caracteres para continuar.
                          </p>
                        )}
                      </div>
                      <a
                        href={canContinue ? confirmUrl : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (!canContinue) {
                            e.preventDefault();
                            return;
                          }
                          onClose();
                          reset();
                        }}
                        aria-disabled={!canContinue}
                        className={`flex items-center justify-center gap-2 rounded-full py-4 font-semibold uppercase tracking-wider text-sm transition-opacity ${
                          canContinue
                            ? "bg-whatsapp text-ink cursor-pointer hover:opacity-90"
                            : "bg-whatsapp/30 text-ink/50 cursor-not-allowed"
                        }`}
                      >
                        <WhatsAppIcon className="w-5 h-5" />
                        Confirmar por WhatsApp
                      </a>
                      <p className="flex items-center justify-center gap-1.5 text-[11px] text-stone-muted text-center">
                        <Check className="w-3.5 h-3.5 text-ice" />
                        Sin pago anticipado · Confirmación en minutos · Reprograma gratis
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
