"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const cards = [
  {
    title: "Lieu",
    accent: "blue" as const,
    body: (
      <>
        On convoque vos pires versions à{" "}
        <span className="neon-text-blue font-semibold">La Bâtie-Rolland</span>{" "}
        (26160).
      </>
    ),
  },
  {
    title: "Couchage",
    accent: "red" as const,
    body: (
      <>
        Couchage sur place{" "}
        <span className="neon-text-red font-semibold">
          fortement recommandé
        </span>
        . Tentes, vans, camping-cars bienvenus sur le grand terrain.
      </>
    ),
  },
  {
    title: "Boissons",
    accent: "blue" as const,
    body: (
      <>
        Amenez de quoi boire — une{" "}
        <span className="neon-text-blue font-semibold">tireuse à bière</span>{" "}
        est fournie sur place.
      </>
    ),
  },
  {
    title: "Nourriture",
    accent: "red" as const,
    body: (
      <>
        <span className="neon-text-red font-semibold">Buffet</span> le samedi
        soir, et potentiel <span className="neon-text-red font-semibold">
          foodtruck
        </span>{" "}
        le dimanche midi (participation financière demandée).
      </>
    ),
  },
];

export default function Info() {
  return (
    <section id="infos" className="relative z-10 px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Infos & logistique"
        title="Avant de franchir le portail"
        accent="blue"
      />
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2">
        {cards.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className={`card-dark rounded-2xl p-6 ${
              c.accent === "red" ? "neon-border-red" : "neon-border-blue"
            }`}
          >
            <h3
              className={`font-display text-2xl sm:text-3xl ${
                c.accent === "red" ? "neon-text-red" : "neon-text-blue"
              }`}
            >
              {c.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/85">
              {c.body}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
