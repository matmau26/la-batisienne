-- =====================================================================
-- Migration : caractere_double -> text[], nouveaux caractères,
--             nouvelle option de couchage "Un bout de carrelage".
-- =====================================================================

-- 1. Supprimer les anciennes contraintes
alter table public.participants
  drop constraint if exists participants_caractere_valide;

alter table public.participants
  drop constraint if exists participants_couchage_valide;

-- 2. Convertir la colonne caractere_double en text[]
--    (les lignes existantes sont wrappées en tableau à 1 élément)
alter table public.participants
  alter column caractere_double type text[]
  using case
    when caractere_double is null then null
    else ARRAY[caractere_double]
  end;

-- 3. Nouvelles contraintes
alter table public.participants
  add constraint participants_caractere_non_vide check (
    array_length(caractere_double, 1) >= 1
  );

alter table public.participants
  add constraint participants_caractere_valide check (
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
  );

alter table public.participants
  add constraint participants_couchage_valide check (
    couchage in (
      'Tente',
      'Van/Camping-car',
      'Un bout de carrelage',
      'Je rentre à mes risques et périls'
    )
  );
