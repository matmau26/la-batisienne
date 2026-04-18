"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Counter from "./Counter";

type Props = {
  initialCount: number | null;
};

export default function Hero({ initialCount }: Props) {
  return (
    <section
      id="accueil"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/batisienne.png"
          alt="La Batisienne — pèlerinage de doubles maléfiques"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-ink-900/70 to-ink-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,3,10,0.9)_80%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-24 text-center sm:py-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 text-xs uppercase tracking-[0.35em] text-white/70 sm:text-sm"
        >
          Samedi 25 juillet 2026 — La Bâtie-Rolland (26160)
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-display text-6xl leading-[0.9] sm:text-7xl md:text-8xl lg:text-9xl"
        >
          <span className="neon-text-red animate-flicker">LA </span>
          <span className="neon-text-blue">BATISIENNE</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-5 max-w-2xl text-lg text-white/85 sm:text-xl"
        >
          Pèlerinage de doubles maléfiques —{" "}
          <span className="neon-text-red font-semibold">
            Ce soir c&apos;est lui qui commande.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-10"
        >
          <Counter initialCount={initialCount} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#inscription"
            className="btn-neon animate-pulseGlow text-sm sm:text-base"
          >
            Je nous inscris, mon double et moi
          </a>
          <a
            href="#deroule"
            className="text-sm uppercase tracking-[0.25em] text-white/70 underline-offset-8 hover:text-neon-blue-soft hover:underline"
          >
            Voir le déroulé ↓
          </a>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest"
      >
        ▼ SCROLL ▼
      </motion.div>
    </section>
  );
}
