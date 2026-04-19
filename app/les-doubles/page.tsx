import Link from "next/link";
import type { Metadata } from "next";
import { getSupabaseServer } from "@/lib/supabase-server";
import DoublesGallery, { type Double } from "@/components/DoublesGallery";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Le Trombinoscope du Chaos — La Batisienne",
  description:
    "Dossiers confidentiels des doubles convoqués. Triés par indice de nuisance.",
};

async function getDoubles(): Promise<Double[]> {
  const supabase = getSupabaseServer();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("participants")
    .select(
      "prenom, nom, blase_double, rencontre_double_sur_place, caracteres_double, score_nuisance",
    )
    .order("score_nuisance", { ascending: false });
  if (error || !data) return [];
  return data as Double[];
}

export default async function LesDoublesPage() {
  const doubles = await getDoubles();

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:py-14">
        <Link
          href="/"
          className="btn-glitch"
          data-text="⬅ Fuir vers l'accueil"
        >
          ⬅ Fuir vers l&apos;accueil
        </Link>

        <header className="mt-10 text-center sm:mt-14">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/55 sm:text-xs">
            Dossier classé confidentiel — {doubles.length} sujet
            {doubles.length > 1 ? "s" : ""} recensé
            {doubles.length > 1 ? "s" : ""}
          </p>
          <h1 className="mt-3 font-display text-5xl leading-none neon-text-red animate-flicker-red sm:text-6xl md:text-7xl">
            Le Trombinoscope du Chaos
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 sm:text-base">
            Galerie des doubles convoqués pour La Batisienne, triée par indice
            de nuisance décroissant. Manipule avec précaution.
          </p>
        </header>

        <DoublesGallery initialDoubles={doubles} />
      </div>
    </main>
  );
}
