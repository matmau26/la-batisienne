-- =====================================================================
-- La Batisienne — Schéma Supabase (état courant)
-- Table : participants
--
-- NOTE : si la table existe déjà, utilise plutôt le fichier
--        supabase/migrations/0002_caracteres_array_et_carrelage.sql
-- =====================================================================

-- Table principale
create table if not exists public.participants (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),

  nom text not null,
  prenom text not null,

  blase_double text,
  rencontre_double_sur_place boolean not null default false,

  caractere_double text[] not null,

  presence_samedi_soir boolean not null default false,
  presence_dimanche_midi boolean not null default false,

  couchage text not null,

  constraint participants_nom_nonempty check (char_length(trim(nom)) > 0),
  constraint participants_prenom_nonempty check (char_length(trim(prenom)) > 0),
  constraint participants_blase_or_rencontre check (
    rencontre_double_sur_place = true
    or (blase_double is not null and char_length(trim(blase_double)) > 0)
  ),
  constraint participants_caractere_non_vide check (
    array_length(caractere_double, 1) >= 1
  ),
  constraint participants_caractere_valide check (
    caractere_double <@ ARRAY[
      'Psychopathe du dancefloor',
      'Démon de la soif',
      'Génie du mal fatigué',
      'Destructeur de buffet',
      'Mystique des enceintes',
      'Urinateur de plantes d''intérieur (et d''extérieur)',
      'Testeur de résistance du mobilier de jardin',
      'Nudiste de fin de soirée',
      'Voleur compulsif de briquets et de dignité',
      'Prédateur de partenaires d''autrui',
      'Divulgateur de secrets inavouables au mégaphone',
      'Postillonneur fou',
      'Instigateur de bagarres de regards',
      'Pleureur ivre en crise existentielle',
      'Gourou de l''alcoolisation forcée',
      'Négociateur de très mauvaises décisions à 5h du matin',
      'Charognard de fonds de verres suspects',
      'Somnambule hostile',
      'Parasite humain (zéro apport, consommation maximale)',
      'Policier corrompu',
      'Un être sale et porteur de maladies rares',
      'Autre'
    ]::text[]
  ),
  constraint participants_couchage_valide check (
    couchage in (
      'Tente',
      'Van/Camping-car',
      'Un bout de carrelage',
      'Je rentre à mes risques et périls'
    )
  )
);

create index if not exists participants_created_at_idx
  on public.participants (created_at desc);

-- =====================================================================
-- Row Level Security
-- =====================================================================
alter table public.participants enable row level security;

drop policy if exists "Lecture publique des participants" on public.participants;
create policy "Lecture publique des participants"
  on public.participants
  for select
  using (true);

drop policy if exists "Insertion anonyme des participants" on public.participants;
create policy "Insertion anonyme des participants"
  on public.participants
  for insert
  with check (true);

-- =====================================================================
-- Realtime : activer la publication pour la table
-- =====================================================================
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'participants'
  ) then
    execute 'alter publication supabase_realtime add table public.participants';
  end if;
end
$$;
