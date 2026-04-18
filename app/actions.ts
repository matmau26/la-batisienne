"use server";

import { getSupabaseServer } from "@/lib/supabase-server";

export type RegistrationInput = {
  nom: string;
  prenom: string;
  blase_double: string | null;
  rencontre_double_sur_place: boolean;
  caractere_double: string;
  presence_samedi_soir: boolean;
  presence_dimanche_midi: boolean;
  couchage: string;
};

export type RegistrationResult =
  | { ok: true; count: number | null }
  | { ok: false; error: string };

const CARACTERES = [
  "Psychopathe du dancefloor",
  "Démon de la soif",
  "Génie du mal fatigué",
  "Destructeur de buffet",
  "Mystique des enceintes",
  "Autre",
];

const COUCHAGES = [
  "Tente",
  "Van/Camping-car",
  "Je rentre à mes risques et périls",
];

function clean(value: unknown, max = 120): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function registerParticipant(
  input: RegistrationInput,
): Promise<RegistrationResult> {
  const nom = clean(input.nom, 80);
  const prenom = clean(input.prenom, 80);
  const blase = clean(input.blase_double, 80);
  const caractere = clean(input.caractere_double, 80);
  const couchage = clean(input.couchage, 80);
  const rencontre = Boolean(input.rencontre_double_sur_place);

  if (!nom || !prenom) {
    return { ok: false, error: "Nom et prénom requis." };
  }
  if (!caractere || !CARACTERES.includes(caractere)) {
    return { ok: false, error: "Caractère du double invalide." };
  }
  if (!couchage || !COUCHAGES.includes(couchage)) {
    return { ok: false, error: "Option de couchage invalide." };
  }
  if (!rencontre && !blase) {
    return {
      ok: false,
      error:
        "Indique le blase de ton double ou coche la case pour le rencontrer sur place.",
    };
  }

  const supabase = getSupabaseServer();
  if (!supabase) {
    return {
      ok: false,
      error:
        "Supabase n'est pas configuré. Ajoute NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }

  const { error } = await supabase.from("participants").insert({
    nom,
    prenom,
    blase_double: rencontre ? null : blase,
    rencontre_double_sur_place: rencontre,
    caractere_double: caractere,
    presence_samedi_soir: Boolean(input.presence_samedi_soir),
    presence_dimanche_midi: Boolean(input.presence_dimanche_midi),
    couchage,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  const { count } = await supabase
    .from("participants")
    .select("*", { count: "exact", head: true });

  return { ok: true, count: count ?? null };
}

export async function getParticipantCount(): Promise<number | null> {
  const supabase = getSupabaseServer();
  if (!supabase) return null;
  const { count, error } = await supabase
    .from("participants")
    .select("*", { count: "exact", head: true });
  if (error) return null;
  return count ?? 0;
}
