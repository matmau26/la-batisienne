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

export const COUCHAGES = [
  "Tente",
  "Van/Camping-car",
  "Un bout de carrelage",
  "Je rentre à mes risques et périls",
] as const;

export type Caractere = (typeof CARACTERES)[number];
export type Couchage = (typeof COUCHAGES)[number];
