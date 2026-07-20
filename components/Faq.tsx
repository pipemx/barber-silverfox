"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/config";
import { Reveal, SectionHeading } from "./ui";

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-panel-${index}`;
  return (
    <Reveal delay={index * 0.05}>
      <div className="bg-surface border border-line rounded-2xl overflow-hidden hover:border-ice/30 transition-colors duration-300">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left cursor-pointer"
          aria-expanded={open}
          aria-controls={id}
        >
          <span className="font-medium text-cream text-sm md:text-base">{q}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 w-8 h-8 rounded-full bg-ice/10 border border-ice/25 flex items-center justify-center"
          >
            <Plus className="w-4 h-4 text-ice" aria-hidden="true" />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="px-5 md:px-6 pb-6 text-sm md:text-base text-stone-muted leading-relaxed">
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export function Faq() {
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          kicker="Preguntas frecuentes"
          title={
            <>
              Todo lo que necesitas <span className="text-ice-gradient italic">saber</span>
            </>
          }
        />
        <div className="flex flex-col gap-4">
          {faqs.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
