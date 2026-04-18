"use server";

import { getSupabaseServer } from "@/lib/supabase-server";
import { CARACTERES, COUCHAGES } from "@/lib/options";

export type RegistrationInput = {
  nom: string;
  prenom: string;
  blase_double: string | null;
  rencontre_double_sur_place: boolean;
  caractere_double: string[];
  presence_samedi_soir: boolean;
  presence_dimanche_midi: boolean;
  couchage: string;
};

export type RegistrationResult =
  | { ok: true; count: number | null }
  | { ok: false; error: string };

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
  const couchage = clean(input.couchage, 80);
  const rencontre = Boolean(input.rencontre_double_sur_place);

  const caracteres = Array.isArray(input.caractere_double)
    ? Array.from(
        new Set(
          input.caractere_double
            .map((c) => clean(c, 120))
            .filter((c) => c.length > 0),
        ),
      )
    : [];

  if (!nom || !prenom) {
    return { ok: false, error: "Nom et prénom requis." };
  }
  if (caracteres.length === 0) {
    return {
      ok: false,
      error: "Choisis au moins un caractère pour ton double.",
    };
  }
  const invalid = caracteres.find(
    (c) => !(CARACTERES as readonly string[]).includes(c),
  );
  if (invalid) {
    return { ok: false, error: `Caractère invalide : ${invalid}` };
  }
  if (!couchage || !(COUCHAGES as readonly string[]).includes(couchage)) {
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
    caractere_double: caracteres,
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
