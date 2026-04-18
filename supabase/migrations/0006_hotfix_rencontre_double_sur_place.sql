-- =====================================================================
-- Hotfix : harmonisation de la colonne rencontre_double_sur_place
--          + rechargement du cache PostgREST.
--
-- Renomme automatiquement les anciens noms eventuels vers
-- rencontre_double_sur_place, ajoute la colonne si manquante,
-- puis notifie PostgREST. Idempotent.
-- =====================================================================

-- 1. Diagnostic
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name = 'participants'
order by ordinal_position;

-- 2. Renommage si un ancien nom existe
do $$
declare
  old_names text[] := array[
    'souhaite_rencontrer',
    'souhaite_rencontrer_double',
    'rencontre_sur_place',
    'rencontrer_double',
    'rencontrer_sur_place'
  ];
  n text;
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'participants'
      and column_name = 'rencontre_double_sur_place'
  ) then
    foreach n in array old_names loop
      if exists (
        select 1 from information_schema.columns
        where table_schema = 'public'
          and table_name = 'participants'
          and column_name = n
      ) then
        execute format(
          'alter table public.participants rename column %I to rencontre_double_sur_place',
          n
        );
        exit;
      end if;
    end loop;
  end if;
end
$$;

-- 3. Ajoute la colonne si toujours manquante
alter table public.participants
  add column if not exists rencontre_double_sur_place boolean;

update public.participants
set rencontre_double_sur_place = false
where rencontre_double_sur_place is null;

alter table public.participants
  alter column rencontre_double_sur_place set not null;

alter table public.participants
  alter column rencontre_double_sur_place set default false;

-- 4. Remet la contrainte "blase OU rencontre sur place"
alter table public.participants
  drop constraint if exists participants_blase_or_rencontre;

alter table public.participants
  add constraint participants_blase_or_rencontre check (
    rencontre_double_sur_place = true
    or (blase_double is not null and char_length(trim(blase_double)) > 0)
  );

-- 5. Recharge le cache PostgREST
notify pgrst, 'reload schema';

-- 6. Verification
select column_name, data_type, is_nullable, column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'participants'
  and column_name = 'rencontre_double_sur_place';
