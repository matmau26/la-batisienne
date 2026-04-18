"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Poster() {
  return (
    <section
      id="affiche"
      className="relative z-10 px-5 py-12 sm:py-16"
      aria-label="Affiche de La Batisienne"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto w-full max-w-5xl"
      >
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl neon-border-red">
          <Image
            src="/batisienne.png"
            alt="Affiche La Batisienne — pèlerinage de doubles maléfiques"
            width={1408}
            height={768}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
            priority
            className="h-auto w-full object-contain"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(5,3,10,0.55)_100%)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
