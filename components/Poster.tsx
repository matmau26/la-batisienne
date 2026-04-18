"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Poster() {
  return (
    <section
      id="affiche"
      className="relative z-10 py-10 sm:py-14"
      aria-label="Affiche de La Batisienne"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.99 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full"
      >
        <Image
          src="/batisienne.png"
          alt="Affiche La Batisienne — pèlerinage de doubles maléfiques"
          width={1408}
          height={768}
          sizes="100vw"
          priority
          className="block h-auto w-full"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_70%,rgba(5,3,10,0.6)_100%)]"
        />
      </motion.div>
    </section>
  );
}
