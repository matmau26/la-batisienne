# La Batisienne — Pèlerinage de doubles maléfiques

Site événementiel one-page (Next.js 14 App Router, Tailwind CSS, Framer Motion, Supabase), prêt pour Vercel.

> Samedi 25 juillet 2026 — La Bâtie-Rolland (26160). Ce soir c'est lui qui commande.

## Stack

- **Next.js 14** (App Router, Server Actions)
- **Tailwind CSS** (dark mode natif, palette néon rouge/bleu)
- **Framer Motion** (animations scroll, fade-in, slide-up, pulse glow)
- **Supabase** (insertion participants + compteur live via Realtime)

## Mise en route

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le fichier d'environnement
cp .env.local.example .env.local
# puis renseigner NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Démarrer en local
npm run dev
```

Le site est disponible sur http://localhost:3000.

## Image du Hero

Dépose ton affiche sous `public/batisienne.png` (format PNG ou WebP, idéalement 1920×1080 ou plus).
L'image est utilisée comme fond d'écran de la section Hero avec un overlay sombre + halo néon.

## Supabase

### 1. Créer la table `participants`

Dans le SQL Editor Supabase, exécuter le script fourni :

```bash
# Le fichier complet
supabase/schema.sql
```

Ce script crée :
- la table `public.participants`,
- les contraintes de validation (caractère du double, options de couchage, blase OU rencontre sur place),
- la RLS avec lecture publique + insertion anonyme (adapté au formulaire ouvert),
- l'ajout à la publication `supabase_realtime` (compteur live).

### 2. Récupérer les clés

Settings → API :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Les deux sont publiques côté client (RLS protège l'accès).

## Architecture

```
app/
  actions.ts         # Server Actions : registerParticipant, getParticipantCount
  layout.tsx         # Layout global + fonts
  page.tsx           # Page one-page (assemble les sections)
  globals.css        # Tailwind + styles néon
components/
  Hero.tsx           # Section Hero (affiche, titre, CTA, compteur)
  Counter.tsx        # Compteur animé + abonnement realtime
  Info.tsx           # Cartes infos & logistique
  Timeline.tsx       # Déroulé animé
  RegistrationForm.tsx # Formulaire relié au Server Action
  Footer.tsx
  SectionHeading.tsx
lib/
  supabase-browser.ts # Client Supabase côté navigateur
  supabase-server.ts  # Client Supabase côté server actions
supabase/
  schema.sql         # Script SQL à exécuter dans Supabase
public/
  batisienne.png     # Image du Hero (à fournir)
```

## Déploiement Vercel

1. Push le repo.
2. Importer dans Vercel.
3. Ajouter les variables d'environnement `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Déployer.

## Accessibilité & responsive

- **Mobile first** : chaque section est testée ≤ 360 px.
- **Respect de `prefers-reduced-motion`** : animations désactivées automatiquement.
- **Contrastes** : texte blanc sur fond quasi-noir, néon pour les accents.
