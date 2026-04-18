export const CARACTERES = [
  "Psychopathe du dancefloor",
  "Démon de la soif",
  "Génie du mal fatigué",
  "Destructeur de buffet",
  "Mystique des enceintes",
  "Urinateur de plantes d'intérieur (et d'extérieur)",
  "Testeur de résistance du mobilier de jardin",
  "Nudiste de fin de soirée",
  "Voleur compulsif de briquets et de dignité",
  "Prédateur de partenaires d'autrui",
  "Divulgateur de secrets inavouables au mégaphone",
  "Postillonneur fou",
  "Instigateur de bagarres de regards",
  "Pleureur ivre en crise existentielle",
  "Gourou de l'alcoolisation forcée",
  "Négociateur de très mauvaises décisions à 5h du matin",
  "Charognard de fonds de verres suspects",
  "Somnambule hostile",
  "Parasite humain (zéro apport, consommation maximale)",
  "Policier corrompu",
  "Un être sale et porteur de maladies rares",
  "Autre",
] as const;

export type Caractere = (typeof CARACTERES)[number];

export const CARACTERE_POINTS: Record<Caractere, number> = {
  "Psychopathe du dancefloor": 10,
  "Génie du mal fatigué": 10,
  "Mystique des enceintes": 10,

  "Démon de la soif": 25,
  "Destructeur de buffet": 25,
  "Nudiste de fin de soirée": 25,
  "Voleur compulsif de briquets et de dignité": 25,
  "Postillonneur fou": 25,
  "Pleureur ivre en crise existentielle": 25,
  Autre: 25,

  "Urinateur de plantes d'intérieur (et d'extérieur)": 50,
  "Testeur de résistance du mobilier de jardin": 50,
  "Instigateur de bagarres de regards": 50,
  "Négociateur de très mauvaises décisions à 5h du matin": 50,
  "Charognard de fonds de verres suspects": 50,
  "Somnambule hostile": 50,
  "Un être sale et porteur de maladies rares": 50,

  "Prédateur de partenaires d'autrui": 100,
  "Divulgateur de secrets inavouables au mégaphone": 100,
  "Gourou de l'alcoolisation forcée": 100,
  "Policier corrompu": 100,
  "Parasite humain (zéro apport, consommation maximale)": 100,
};

export function scoreOf(caracteres: readonly string[]): number {
  let total = 0;
  for (const c of caracteres) {
    const pts = CARACTERE_POINTS[c as Caractere];
    if (typeof pts === "number") total += pts;
  }
  return total;
}

export type DangerTier = {
  label: string;
  min: number;
  max: number | null;
  accent: "white" | "blue" | "red" | "red-max";
};

export const DANGER_TIERS: DangerTier[] = [
  { label: "Risque Acceptable", min: 0, max: 49, accent: "white" },
  { label: "Alerte Logistique/Sociale", min: 50, max: 99, accent: "blue" },
  { label: "Menace Avérée", min: 100, max: 199, accent: "red" },
  { label: "Danger Absolu", min: 200, max: null, accent: "red-max" },
];

export function tierFor(score: number): DangerTier {
  for (const t of DANGER_TIERS) {
    if (score >= t.min && (t.max === null || score <= t.max)) return t;
  }
  return DANGER_TIERS[0];
}

export const COUCHAGES = [
  "Tente",
  "Van/Camping-car",
  "Un bout de carrelage",
  "Je rentre à mes risques et périls",
] as const;

export type Couchage = (typeof COUCHAGES)[number];
