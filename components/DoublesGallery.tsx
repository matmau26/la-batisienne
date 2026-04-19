"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import { tierFor } from "@/lib/options";

export type Double = {
  prenom: string;
  nom: string;
  blase_double: string | null;
  rencontre_double_sur_place: boolean;
  caracteres_double: string[];
  score_nuisance: number;
};

function displayName(prenom: string, nom: string): string {
  const initial = nom.trim().charAt(0).toUpperCase();
  return initial ? `${prenom} ${initial}.` : prenom;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 15, mass: 0.6 },
  },
};

const ABSOLU_BOX_SHADOW = [
  "0 0 14px rgba(255,23,68,0.55), 0 0 40px rgba(255,23,68,0.3)",
  "0 0 36px rgba(255,23,68,1), 0 0 80px rgba(255,23,68,0.65)",
  "0 0 18px rgba(255,23,68,0.6), 0 0 50px rgba(255,23,68,0.4)",
  "0 0 14px rgba(255,23,68,0.55), 0 0 40px rgba(255,23,68,0.3)",
];

const MENACE_BOX_SHADOW = [
  "0 0 10px rgba(168,85,247,0.4), 0 0 28px rgba(168,85,247,0.25)",
  "0 0 22px rgba(255,140,0,0.55), 0 0 50px rgba(168,85,247,0.55)",
  "0 0 10px rgba(168,85,247,0.4), 0 0 28px rgba(168,85,247,0.25)",
];

function DoubleCard({ d }: { d: Double }) {
  const tier = tierFor(d.score_nuisance);
  const isAbsolu = tier.accent === "red-max";
  const isMenace = tier.accent === "red";
  const isAlerte = tier.accent === "blue";

  const blaseEmpty = !d.blase_double || !d.blase_double.trim();
  const displayBlase =
    d.rencontre_double_sur_place || blaseEmpty
      ? "En quête d'identité obscure…"
      : d.blase_double!;
  const blaseUnknown = d.rencontre_double_sur_place || blaseEmpty;

  const continuousAnim = isAbsolu
    ? {
        y: [0, -5, 5, -2, 0],
        rotate: [-0.7, 0.9, -0.4, 0.6, 0],
        boxShadow: ABSOLU_BOX_SHADOW,
      }
    : isMenace
      ? { boxShadow: MENACE_BOX_SHADOW }
      : undefined;

  const continuousTransition: Transition | undefined = isAbsolu
    ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
    : isMenace
      ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
      : undefined;

  const borderClass = isAbsolu
    ? "border-neon-red"
    : isMenace
      ? "border-[rgba(168,85,247,0.55)]"
      : isAlerte
        ? "border-neon-blue/50"
        : "border-white/10";

  const scoreClass = isAbsolu
    ? "neon-text-red"
    : isMenace
      ? "text-[rgb(232,121,249)]"
      : isAlerte
        ? "neon-text-blue"
        : "text-white";

  const tierLabelClass = isAbsolu
    ? "neon-text-red"
    : isMenace
      ? "text-[rgb(232,121,249)]"
      : isAlerte
        ? "neon-text-blue"
        : "text-white/70";

  return (
    <motion.li variants={itemVariants} className="relative list-none">
      <motion.article
        initial={false}
        animate={continuousAnim}
        transition={continuousTransition}
        whileHover={{ scale: 1.05, zIndex: 20 }}
        className={`card-dark relative rounded-2xl border p-5 ${borderClass}`}
      >
        <header className="mb-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/55">
            Prénom du vaisseau
          </p>
          <p className="mt-0.5 text-sm font-medium text-white/80">
            {displayName(d.prenom, d.nom)}
          </p>
          <h3
            className={`mt-3 font-display text-2xl leading-tight sm:text-3xl ${
              blaseUnknown
                ? "italic text-white/50"
                : isAbsolu || isMenace
                  ? "neon-text-red"
                  : isAlerte
                    ? "neon-text-blue"
                    : "neon-text-mix"
            }`}
          >
            {displayBlase}
          </h3>
        </header>

        {d.caracteres_double.length > 0 ? (
          <ul className="mb-4 flex flex-wrap gap-1.5">
            {d.caracteres_double.map((c) => (
              <li
                key={c}
                className="rounded-sm border border-white/15 bg-white/[0.04] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/75"
              >
                {c}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex items-end justify-between gap-3 border-t border-white/10 pt-3">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-display text-4xl tabular-nums sm:text-5xl ${scoreClass}`}
            >
              {d.score_nuisance}
            </span>
            <span className="text-xs uppercase tracking-widest text-white/50">
              pts
            </span>
          </div>
          <span
            className={`text-right text-[10px] font-bold uppercase leading-tight tracking-[0.18em] ${tierLabelClass}`}
          >
            {tier.label}
          </span>
        </div>
      </motion.article>
    </motion.li>
  );
}

type Props = {
  initialDoubles: Double[];
};

export default function DoublesGallery({ initialDoubles }: Props) {
  if (initialDoubles.length === 0) {
    return (
      <div className="mx-auto mt-16 max-w-md text-center">
        <p className="font-display text-3xl neon-text-blue animate-flicker-blue">
          Aucun double n&apos;a encore été convoqué.
        </p>
        <p className="mt-3 text-sm text-white/60">
          Le pèlerinage attend ses premières âmes…
        </p>
      </div>
    );
  }

  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
    >
      {initialDoubles.map((d, i) => (
        <DoubleCard key={`${d.prenom}-${d.nom}-${i}`} d={d} />
      ))}
    </motion.ul>
  );
}
