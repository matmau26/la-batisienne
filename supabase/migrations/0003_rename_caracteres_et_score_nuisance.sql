-- =====================================================================
-- Migration : renommer caractere_double -> caracteres_double,
--             ajouter la colonne score_nuisance et backfill.
-- =====================================================================

-- 1. Renommer la colonne (les anciennes contraintes continuent à
--    référencer la colonne via son nouvel identifiant).
alter table public.participants
  rename column caractere_double to caracteres_double;

-- 2. Ajouter la colonne score_nuisance
alter table public.participants
  add column if not exists score_nuisance integer not null default 0;

alter table public.participants
  drop constraint if exists participants_score_nuisance_nonneg;

alter table public.participants
  add constraint participants_score_nuisance_nonneg
  check (score_nuisance >= 0);

-- 3. Backfill : calculer le score pour les lignes existantes
update public.participants p
set score_nuisance = coalesce((
  select sum(case c
    when 'Psychopathe du dancefloor' then 10
    when 'Génie du mal fatigué' then 10
    when 'Mystique des enceintes' then 10

    when 'Démon de la soif' then 25
    when 'Destructeur de buffet' then 25
    when 'Nudiste de fin de soirée' then 25
    when 'Voleur compulsif de briquets et de dignité' then 25
    when 'Postillonneur fou' then 25
    when 'Pleureur ivre en crise existentielle' then 25
    when 'Autre' then 25

    when 'Urinateur de plantes d''intérieur (et d''extérieur)' then 50
    when 'Testeur de résistance du mobilier de jardin' then 50
    when 'Instigateur de bagarres de regards' then 50
    when 'Négociateur de très mauvaises décisions à 5h du matin' then 50
    when 'Charognard de fonds de verres suspects' then 50
    when 'Somnambule hostile' then 50
    when 'Un être sale et porteur de maladies rares' then 50

    when 'Prédateur de partenaires d''autrui' then 100
    when 'Divulgateur de secrets inavouables au mégaphone' then 100
    when 'Gourou de l''alcoolisation forcée' then 100
    when 'Policier corrompu' then 100
    when 'Parasite humain (zéro apport, consommation maximale)' then 100

    else 0
  end)
  from unnest(p.caracteres_double) as c
), 0);
