-- =====================================================================
-- Hotfix : "Could not find the 'couchage' column of 'participants'
--          in the schema cache"
--
-- A lancer dans Supabase -> SQL Editor.
-- Idempotent : peut etre rejoue sans risque.
-- =====================================================================

-- 1. Diagnostic (lis le resultat : toutes les colonnes attendues
--    doivent apparaitre).
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name = 'participants'
order by ordinal_position;

-- 2. Ajoute la colonne couchage si elle manque
alter table public.participants
  add column if not exists couchage text;

update public.participants
set couchage = 'Tente'
where couchage is null;

alter table public.participants
  alter column couchage set not null;

-- 3. Re-pose la contrainte de validation (inclut "Un bout de carrelage")
alter table public.participants
  drop constraint if exists participants_couchage_valide;

alter table public.participants
  add constraint participants_couchage_valide check (
    couchage in (
      'Tente',
      'Van/Camping-car',
      'Un bout de carrelage',
      'Je rentre à mes risques et périls'
    )
  );

-- 4. Recharge le cache de schema PostgREST (corrige l'erreur
--    "Could not find ... column ... in the schema cache")
notify pgrst, 'reload schema';
