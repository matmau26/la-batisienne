"use client";

import { motion } from "framer-motion";
import Counter from "./Counter";

type Props = {
  initialCount: number | null;
};

export default function Hero({ initialCount }: Props) {
  return (
    <section
      id="accueil"
      className="relative isolate flex min-h-[72svh] w-full items-center justify-center px-5 pb-16 pt-20 sm:min-h-[78svh] sm:pb-20 sm:pt-24"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-3 text-[11px] uppercase tracking-[0.35em] text-white/70 sm:text-xs"
        >
          Samedi 25 juillet 2026 — La Bâtie-Rolland (26160)
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl leading-[0.9] sm:text-6xl md:text-7xl"
        >
          <span className="neon-text-red animate-flicker">LA </span>
          <span className="neon-text-blue">BATISIENNE</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-3 max-w-xl text-sm text-white/85 sm:mt-4 sm:text-base"
        >
          Pèlerinage de doubles maléfiques —{" "}
          <span className="neon-text-red font-semibold">
            Ce soir c&apos;est lui qui commande.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 sm:mt-8"
        >
          <Counter initialCount={initialCount} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-6 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row"
        >
          <a
            href="#inscription"
            className="btn-neon animate-pulseGlow text-sm"
          >
            Je nous inscris, mon double et moi
          </a>
          <a
            href="#deroule"
            className="text-xs uppercase tracking-[0.25em] text-white/70 underline-offset-8 hover:text-neon-blue-soft hover:underline"
          >
            Voir le déroulé ↓
          </a>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-white/50 sm:text-xs"
      >
        ▼ SCROLL ▼
      </motion.div>
    </section>
  );
}
