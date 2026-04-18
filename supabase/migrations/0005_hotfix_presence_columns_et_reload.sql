-- =====================================================================
-- Hotfix : harmonisation des noms de colonnes presence_*_midi/_soir
--          + rechargement du cache PostgREST.
--
-- Cause probable : la colonne a ete creee sous un ancien nom
-- (ex : presence_dimanche) ou le cache du schema PostgREST est
-- desynchronise apres un ALTER TABLE.
--
-- Ce script est idempotent : re-jouable sans risque.
-- =====================================================================

-- 1. Diagnostic initial : liste toutes les colonnes de la table
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name = 'participants'
order by ordinal_position;

-- 2. Renommage si un ancien nom est present
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'participants'
      and column_name = 'presence_dimanche'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'participants'
      and column_name = 'presence_dimanche_midi'
  ) then
    execute 'alter table public.participants rename column presence_dimanche to presence_dimanche_midi';
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'participants'
      and column_name = 'presence_samedi'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'participants'
      and column_name = 'presence_samedi_soir'
  ) then
    execute 'alter table public.participants rename column presence_samedi to presence_samedi_soir';
  end if;
end
$$;

-- 3. Ajoute les colonnes si elles manquent toujours
alter table public.participants
  add column if not exists presence_samedi_soir boolean;

alter table public.participants
  add column if not exists presence_dimanche_midi boolean;

update public.participants set presence_samedi_soir = false where presence_samedi_soir is null;
update public.participants set presence_dimanche_midi = false where presence_dimanche_midi is null;

alter table public.participants alter column presence_samedi_soir set not null;
alter table public.participants alter column presence_samedi_soir set default false;

alter table public.participants alter column presence_dimanche_midi set not null;
alter table public.participants alter column presence_dimanche_midi set default false;

-- 4. Recharge le cache PostgREST (corrige "Could not find ... in the schema cache")
notify pgrst, 'reload schema';

-- 5. Verification finale
select column_name, data_type, is_nullable, column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'participants'
  and column_name in ('presence_samedi_soir', 'presence_dimanche_midi', 'couchage')
order by column_name;
