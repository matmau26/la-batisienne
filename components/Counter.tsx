"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

type Props = {
  initialCount: number | null;
};

export default function Counter({ initialCount }: Props) {
  const [count, setCount] = useState<number | null>(initialCount);
  const [displayed, setDisplayed] = useState<number>(initialCount ?? 0);
  const rafRef = useRef<number | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    let active = true;

    const refresh = async () => {
      const { count: fresh } = await supabase
        .from("participants")
        .select("*", { count: "exact", head: true });
      if (active && typeof fresh === "number") setCount(fresh);
    };

    refresh();

    const channel = supabase
      .channel("participants-count")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "participants" },
        () => refresh(),
      )
      .subscribe();

    const interval = window.setInterval(refresh, 30000);

    return () => {
      active = false;
      window.clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (count == null) return;
    const start = displayed;
    const end = count;
    if (start === end) return;

    const duration = 900;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(start + (end - start) * eased);
      setDisplayed(value);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    controls.start({
      scale: [1, 1.15, 1],
      transition: { duration: 0.6, ease: "easeOut" },
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        animate={controls}
        className="flex items-baseline gap-3 rounded-2xl px-6 py-3 card-dark neon-border-blue"
      >
        <span className="font-display text-5xl sm:text-6xl neon-text-blue tabular-nums">
          {count == null ? "—" : displayed.toLocaleString("fr-FR")}
        </span>
        <span className="text-sm sm:text-base uppercase tracking-widest text-white/70">
          doubles convoqués
        </span>
      </motion.div>
      <span className="text-xs text-white/50">
        {count == null
          ? "Connecte Supabase pour activer le compteur en temps réel."
          : "Mise à jour en direct"}
      </span>
    </div>
  );
}
