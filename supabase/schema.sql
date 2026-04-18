-- =====================================================================
-- La Batisienne — Schéma Supabase
-- Table : participants
-- =====================================================================

-- Table principale
create table if not exists public.participants (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),

  nom text not null,
  prenom text not null,

  blase_double text,
  rencontre_double_sur_place boolean not null default false,

  caractere_double text not null,

  presence_samedi_soir boolean not null default false,
  presence_dimanche_midi boolean not null default false,

  couchage text not null,

  constraint participants_nom_nonempty check (char_length(trim(nom)) > 0),
  constraint participants_prenom_nonempty check (char_length(trim(prenom)) > 0),
  constraint participants_blase_or_rencontre check (
    rencontre_double_sur_place = true
    or (blase_double is not null and char_length(trim(blase_double)) > 0)
  ),
  constraint participants_caractere_valide check (
    caractere_double in (
      'Psychopathe du dancefloor',
      'Démon de la soif',
      'Génie du mal fatigué',
      'Destructeur de buffet',
      'Mystique des enceintes',
      'Autre'
    )
  ),
  constraint participants_couchage_valide check (
    couchage in (
      'Tente',
      'Van/Camping-car',
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

-- Lecture publique (utile pour le compteur live)
drop policy if exists "Lecture publique des participants" on public.participants;
create policy "Lecture publique des participants"
  on public.participants
  for select
  using (true);

-- Insertion publique anonyme (formulaire)
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
