"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import {
  registerParticipant,
  type RegistrationInput,
} from "@/app/actions";
import {
  CARACTERES,
  COUCHAGES,
  scoreOf,
  tierFor,
} from "@/lib/options";

const TIER_STYLES: Record<string, string> = {
  white: "border-white/25 bg-white/5 text-white/80",
  blue: "border-neon-blue bg-neon-blue/10 text-neon-blue-soft shadow-glow-blue",
  red: "border-neon-red bg-neon-red/10 text-neon-red-soft shadow-glow-red",
  "red-max":
    "border-neon-red bg-neon-red/20 text-white shadow-glow-red animate-pulseGlow",
};

type State = "idle" | "submitting" | "success" | "error";

export default function RegistrationForm() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [blase, setBlase] = useState("");
  const [rencontre, setRencontre] = useState(false);
  const [caracteres, setCaracteres] = useState<string[]>([]);
  const [samedi, setSamedi] = useState<"oui" | "non">("oui");
  const [dimanche, setDimanche] = useState<"oui" | "non">("oui");
  const [couchage, setCouchage] = useState<string>(COUCHAGES[0]);
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState<string | null>(null);

  function toggleCaractere(value: string) {
    setCaracteres((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value],
    );
  }

  const score = useMemo(() => scoreOf(caracteres), [caracteres]);
  const tier = useMemo(() => tierFor(score), [score]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setMessage(null);

    const payload: RegistrationInput = {
      nom,
      prenom,
      blase_double: rencontre ? null : blase,
      rencontre_double_sur_place: rencontre,
      caracteres_double: caracteres,
      presence_samedi_soir: samedi === "oui",
      presence_dimanche_midi: dimanche === "oui",
      couchage,
    };

    const res = await registerParticipant(payload);
    if (res.ok) {
      setState("success");
      setMessage(
        res.count != null
          ? `Bienvenue. Tu es le/la double n°${res.count}. Score de nuisance : ${res.score} pts.`
          : `Bienvenue dans le pèlerinage. Score de nuisance : ${res.score} pts.`,
      );
      setNom("");
      setPrenom("");
      setBlase("");
      setRencontre(false);
      setCaracteres([]);
      setSamedi("oui");
      setDimanche("oui");
      setCouchage(COUCHAGES[0]);
    } else {
      setState("error");
      setMessage(res.error);
    }
  }

  return (
    <section
      id="inscription"
      className="relative z-10 px-5 py-20 sm:py-28"
    >
      <SectionHeading
        eyebrow="Inscription"
        title="Convoque ton double"
        accent="red"
      />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="card-dark mx-auto max-w-2xl rounded-3xl p-6 sm:p-10 neon-border-red"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="label-dark" htmlFor="prenom">
              Prénom
            </label>
            <input
              id="prenom"
              required
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="input-dark"
              placeholder="Jean"
              maxLength={80}
            />
          </div>
          <div>
            <label className="label-dark" htmlFor="nom">
              Nom
            </label>
            <input
              id="nom"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="input-dark"
              placeholder="Dupont"
              maxLength={80}
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="label-dark" htmlFor="blase">
            Blase de mon double
          </label>
          <input
            id="blase"
            value={blase}
            onChange={(e) => setBlase(e.target.value)}
            disabled={rencontre}
            className="input-dark disabled:opacity-50"
            placeholder="Ex : Jean le Terrible"
            maxLength={80}
          />
          <label className="mt-3 flex items-center gap-3 text-sm text-white/80">
            <input
              type="checkbox"
              checked={rencontre}
              onChange={(e) => setRencontre(e.target.checked)}
              className="h-4 w-4 accent-neon-red"
            />
            Je n&apos;en ai pas, je souhaite le rencontrer ce soir.
          </label>
        </div>

        <div className="mt-5">
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <span className="label-dark mb-0">Caractère de mon double</span>
            <span className="text-xs text-white/50">
              Plusieurs choix possibles · {caracteres.length} sélectionné
              {caracteres.length > 1 ? "s" : ""}
            </span>
          </div>

          <motion.div
            key={tier.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mb-4 flex flex-col gap-2 rounded-2xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${TIER_STYLES[tier.accent]}`}
            aria-live="polite"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-xs uppercase tracking-[0.25em] opacity-80">
                Score de nuisance
              </span>
              <span className="font-display text-3xl tabular-nums">
                {score}
              </span>
              <span className="text-sm opacity-80">pts</span>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              {tier.label}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {CARACTERES.map((c) => {
              const selected = caracteres.includes(c);
              return (
                <label
                  key={c}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                    selected
                      ? "border-neon-red bg-neon-red/10 shadow-glow-red"
                      : "border-white/10 hover:border-white/25"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="caractere"
                    value={c}
                    checked={selected}
                    onChange={() => toggleCaractere(c)}
                    className="h-4 w-4 shrink-0 accent-neon-red"
                  />
                  <span className="flex-1 text-sm leading-snug text-white/90">
                    {c}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <fieldset>
            <legend className="label-dark">Présence samedi soir</legend>
            <div className="flex gap-2">
              {(["oui", "non"] as const).map((v) => (
                <label
                  key={v}
                  className={`flex flex-1 cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm uppercase tracking-widest transition ${
                    samedi === v
                      ? "border-neon-blue bg-neon-blue/10 text-neon-blue-soft shadow-glow-blue"
                      : "border-white/10 text-white/80 hover:border-white/25"
                  }`}
                >
                  <input
                    type="radio"
                    name="samedi"
                    value={v}
                    checked={samedi === v}
                    onChange={() => setSamedi(v)}
                    className="sr-only"
                  />
                  {v}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="label-dark">Présence dimanche midi</legend>
            <div className="flex gap-2">
              {(["oui", "non"] as const).map((v) => (
                <label
                  key={v}
                  className={`flex flex-1 cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm uppercase tracking-widest transition ${
                    dimanche === v
                      ? "border-neon-blue bg-neon-blue/10 text-neon-blue-soft shadow-glow-blue"
                      : "border-white/10 text-white/80 hover:border-white/25"
                  }`}
                >
                  <input
                    type="radio"
                    name="dimanche"
                    value={v}
                    checked={dimanche === v}
                    onChange={() => setDimanche(v)}
                    className="sr-only"
                  />
                  {v}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-5">
          <label className="label-dark" htmlFor="couchage">
            Option de couchage
          </label>
          <select
            id="couchage"
            value={couchage}
            onChange={(e) => setCouchage(e.target.value)}
            className="input-dark appearance-none bg-[linear-gradient(45deg,transparent_50%,rgba(255,255,255,0.5)_50%),linear-gradient(135deg,rgba(255,255,255,0.5)_50%,transparent_50%)] bg-[length:6px_6px,6px_6px] bg-[position:calc(100%-18px)_calc(50%-3px),calc(100%-12px)_calc(50%-3px)] bg-no-repeat pr-10"
          >
            {COUCHAGES.map((c) => (
              <option key={c} value={c} className="bg-ink-800">
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            type="submit"
            disabled={state === "submitting"}
            className="btn-neon w-full sm:w-auto animate-pulseGlow disabled:opacity-60"
          >
            {state === "submitting"
              ? "Convocation en cours..."
              : "Convoquer mon double"}
          </button>

          <AnimatePresence mode="wait">
            {message ? (
              <motion.p
                key={message}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`text-sm text-center ${
                  state === "success"
                    ? "neon-text-blue"
                    : state === "error"
                      ? "neon-text-red"
                      : "text-white/80"
                }`}
              >
                {message}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.form>
    </section>
  );
}
