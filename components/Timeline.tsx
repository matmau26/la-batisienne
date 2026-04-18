"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

type Step = {
  when: string;
  title: string;
  desc: string;
  accent: "red" | "blue";
};

const steps: Step[] = [
  {
    when: "Samedi — Fin d'après-midi",
    title: "Arrivée des doubles",
    desc: "Les portails s'ouvrent, les vans débarquent, les tentes se dressent. Présentations sur fond de basses.",
    accent: "blue",
  },
  {
    when: "Samedi — Soir",
    title: "Festivités & buffet",
    desc: "Buffet maléfique, enceintes à fond, dancefloor possédé. Les pires versions prennent les commandes.",
    accent: "red",
  },
  {
    when: "Dimanche — Midi",
    title: "Repas (foodtruck potentiel)",
    desc: "On recharge les âmes. Foodtruck possible avec participation financière.",
    accent: "blue",
  },
  {
    when: "Dimanche — Après-midi",
    title: "Pool Party gros son",
    desc: "Piscine, sono, bombes à eau et lunettes noires. Clôture en apothéose.",
    accent: "red",
  },
];

export default function Timeline() {
  return (
    <section id="deroule" className="relative z-10 px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Déroulé"
        title="Le programme des doubles"
        accent="red"
      />

      <div className="relative mx-auto max-w-4xl">
        {/* Vertical rail */}
        <div
          aria-hidden
          className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-red via-neon-blue to-neon-red shadow-[0_0_16px_rgba(255,23,68,0.5)] sm:left-1/2 sm:-translate-x-1/2"
        />

        <ol className="space-y-10">
          {steps.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="relative pl-12 sm:pl-0"
              >
                {/* Node */}
                <span
                  aria-hidden
                  className={`absolute left-4 top-3 h-4 w-4 -translate-x-1/2 rounded-full ${
                    s.accent === "red"
                      ? "bg-neon-red shadow-glow-red"
                      : "bg-neon-blue shadow-glow-blue"
                  } sm:left-1/2`}
                />

                <div
                  className={`grid gap-4 sm:grid-cols-2 ${
                    left ? "" : "sm:[&>*:first-child]:order-2"
                  }`}
                >
                  <div
                    className={`sm:text-right sm:pr-10 ${
                      left ? "" : "sm:text-left sm:pl-10 sm:pr-0"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                      {s.when}
                    </p>
                    <h3
                      className={`mt-2 font-display text-2xl sm:text-3xl ${
                        s.accent === "red"
                          ? "neon-text-red"
                          : "neon-text-blue"
                      }`}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <div
                    className={`sm:pl-10 ${left ? "" : "sm:pl-0 sm:pr-10"}`}
                  >
                    <div
                      className={`card-dark rounded-2xl p-5 ${
                        s.accent === "red"
                          ? "neon-border-red"
                          : "neon-border-blue"
                      }`}
                    >
                      <p className="text-white/85 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
