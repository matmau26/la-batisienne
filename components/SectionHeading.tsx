"use client";

import { motion } from "framer-motion";

type Props = {
  eyebrow?: string;
  title: string;
  accent?: "red" | "blue";
};

export default function SectionHeading({
  eyebrow,
  title,
  accent = "red",
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
      className="mx-auto mb-10 max-w-3xl text-center"
    >
      {eyebrow ? (
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/60">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-4xl leading-none sm:text-5xl md:text-6xl ${
          accent === "red"
            ? "neon-text-red animate-flicker-red"
            : "neon-text-blue animate-flicker-blue"
        }`}
      >
        {title}
      </h2>
      <div
        className={`mx-auto mt-4 h-[2px] w-24 ${
          accent === "red"
            ? "bg-neon-red shadow-glow-red"
            : "bg-neon-blue shadow-glow-blue"
        }`}
      />
    </motion.div>
  );
}
