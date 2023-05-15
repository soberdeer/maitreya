import type {
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
} from 'contentful';

export interface TypeArticlesFields {
  name: EntryFieldTypes.Symbol;
  restricted: EntryFieldTypes.Boolean;
  description?: EntryFieldTypes.RichText;
  restricted_access?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArticlesSkeleton>>;
  references?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
}

export type TypeArticlesSkeleton = EntrySkeletonType<TypeArticlesFields, 'articles'>;
export type TypeArticles = Entry<TypeArticlesSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>;

export interface TypeBlockFields {
  id: EntryFieldTypes.Symbol;
  name?: EntryFieldTypes.Symbol;
  list?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArticlesSkeleton>>;
}

export type TypeBlockSkeleton = EntrySkeletonType<TypeBlockFields, 'block'>;
export type TypeBlock = Entry<TypeBlockSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>;

export interface TypeCombatFields {
  name: EntryFieldTypes.Symbol;
  restricted: EntryFieldTypes.Boolean;
  standard?: EntryFieldTypes.Array<
    EntryFieldTypes.Symbol<'Воин' | 'Навигатор' | 'Телепат' | 'Целитель'>
  >;
  stand?: EntryFieldTypes.EntryLink<TypeStandsSkeleton>;
  state: EntryFieldTypes.Symbol<'И в фуге, и вне фуги' | 'Только в фуге' | 'Только вне фуги'>;
  will?: EntryFieldTypes.Integer;
  elements?: EntryFieldTypes.Symbol;
  level: EntryFieldTypes.Symbol<'Адепт' | 'Мастер' | 'Ученик'>;
  type: EntryFieldTypes.Symbol<
    'Ближний бой' | 'Восстановление' | 'Защита' | 'Навигация' | 'Стрельба' | 'Телепатия'
  >;
  target: EntryFieldTypes.Symbol<
    '1 цель' | '2 цели' | '3 цели' | 'Все поле' | 'Конус (до 180°)' | 'На себя'
  >;
  touch: EntryFieldTypes.Boolean;
  effect?: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.RichText;
  video?: EntryFieldTypes.AssetLink;
}

export type TypeCombatSkeleton = EntrySkeletonType<TypeCombatFields, 'combat'>;
export type TypeCombat = Entry<TypeCombatSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>;

export interface TypeElementsFields {
  name?: EntryFieldTypes.Symbol;
  shortname?: EntryFieldTypes.Symbol;
  eng_key?: EntryFieldTypes.Symbol;
  color?: EntryFieldTypes.Symbol;
  image?: EntryFieldTypes.AssetLink;
}

export type TypeElementsSkeleton = EntrySkeletonType<TypeElementsFields, 'elements'>;
export type TypeElements = Entry<TypeElementsSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>;

export interface TypeHouseFields {
  name?: EntryFieldTypes.Symbol;
  type?: EntryFieldTypes.Symbol<'Великий Дом' | 'Картель' | 'Малый Дом' | 'Орден' | 'Союз'>;
  image?: EntryFieldTypes.AssetLink;
  width: EntryFieldTypes.Integer;
  height: EntryFieldTypes.Integer;
}

export type TypeHouseSkeleton = EntrySkeletonType<TypeHouseFields, 'house'>;
export type TypeHouse = Entry<TypeHouseSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>;

export interface TypeMain_pageFields {
  name: EntryFieldTypes.Symbol;
  top_post?: EntryFieldTypes.EntryLink<TypePostSkeleton>;
  posts?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypePostSkeleton>>;
}

export type TypeMain_pageSkeleton = EntrySkeletonType<TypeMain_pageFields, 'main_page'>;
export type TypeMain_page = Entry<TypeMain_pageSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>;

export interface TypeMainFields {
  id: EntryFieldTypes.Symbol;
  logo?: EntryFieldTypes.AssetLink;
  vk_url?: EntryFieldTypes.Symbol;
  menu: EntryFieldTypes.Object;
  elements?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeElementsSkeleton>>;
}

export type TypeMainSkeleton = EntrySkeletonType<TypeMainFields, 'main'>;
export type TypeMain = Entry<TypeMainSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>;

export interface TypePageFields {
  name?: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  blocks?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeBlockSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, 'page'>;
export type TypePage = Entry<TypePageSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>;

export interface TypePostFields {
  name?: EntryFieldTypes.Symbol;
  date: EntryFieldTypes.Date;
  content?: EntryFieldTypes.RichText;
}

export type TypePostSkeleton = EntrySkeletonType<TypePostFields, 'post'>;
export type TypePost = Entry<TypePostSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>;

export interface TypeRitualsFields {
  name: EntryFieldTypes.Symbol;
  restricted: EntryFieldTypes.Boolean;
  standard?: EntryFieldTypes.Array<
    EntryFieldTypes.Symbol<'Воин' | 'Навигатор' | 'Телепат' | 'Целитель'>
  >;
  will?: EntryFieldTypes.Text;
  elements?: EntryFieldTypes.Symbol;
  level: EntryFieldTypes.Symbol<'Адепт' | 'Мастер' | 'Ученик'>;
  effect?: EntryFieldTypes.Text;
  description?: EntryFieldTypes.RichText;
  manifest?: EntryFieldTypes.RichText;
  video?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypeRitualsSkeleton = EntrySkeletonType<TypeRitualsFields, 'rituals'>;
export type TypeRituals = Entry<TypeRitualsSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>;

export interface TypeStandsFields {
  name?: EntryFieldTypes.Symbol;
  restricted: EntryFieldTypes.Boolean;
  level: EntryFieldTypes.Symbol<'Адепт' | 'Мастер' | 'Ученик'>;
  type: EntryFieldTypes.Symbol<
    'Ближний бой' | 'Восстановление' | 'Защита' | 'Навигация' | 'Стрельба' | 'Телепатия'
  >;
  description?: EntryFieldTypes.RichText;
  video?: EntryFieldTypes.AssetLink;
}

export type TypeStandsSkeleton = EntrySkeletonType<TypeStandsFields, 'stands'>;
export type TypeStands = Entry<TypeStandsSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>;

export interface TypeUsersFields {
  name?: EntryFieldTypes.Symbol;
  code: EntryFieldTypes.Symbol;
  rating?: EntryFieldTypes.Integer;
  bio?: EntryFieldTypes.Symbol;
  profession: EntryFieldTypes.Symbol;
  work: EntryFieldTypes.Symbol;
  rank_group?: EntryFieldTypes.Symbol<
    | 'Высший офицерский состав'
    | 'До-офицерский состав'
    | 'Младший офицерский состав'
    | 'Старший офицерский состав'
  >;
  rank_number?: EntryFieldTypes.Symbol<
    | '1 - курсант, младший лейтенант, капитан 3-го ранга, контр-адмирал'
    | '2 - младший сержант, лейтенант, капитан 2-го ранга, адмирал'
    | '3 - сержант, старший лейтенант, капитан 1-го ранга, адмирал флота'
    | '4 - энсин, капитан-лейтенант, командор, адмирал системы'
  >;
  course?: EntryFieldTypes.Symbol<'И' | 'Сан' | 'Эр'>;
  cadet_number?: EntryFieldTypes.Integer;
  homeless: EntryFieldTypes.Boolean;
  house?: EntryFieldTypes.EntryLink<TypeHouseSkeleton>;
  order?: EntryFieldTypes.EntryLink<TypeHouseSkeleton>;
  start_health?: EntryFieldTypes.Integer;
  start_will?: EntryFieldTypes.Integer;
  honor?: EntryFieldTypes.Symbol<'Человек Высокой Чести' | 'Человек Чести' | 'Человек без Чести'>;
  introjects?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  beliefs?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  creed?: EntryFieldTypes.Symbol;
  avatar_profile?: EntryFieldTypes.AssetLink;
  avatar_chat?: EntryFieldTypes.AssetLink;
  technics?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCombatSkeleton>>;
  rituals?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeRitualsSkeleton>>;
  personal_access?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<
      TypeArticlesSkeleton | TypeCombatSkeleton | TypeRitualsSkeleton | TypeStandsSkeleton
    >
  >;
}

export type TypeUsersSkeleton = EntrySkeletonType<TypeUsersFields, 'users'>;
export type TypeUsers = Entry<TypeUsersSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>;

export type TypeFetchSkeleton =
  | TypeRitualsSkeleton
  | TypeArticlesSkeleton
  | TypeStandsSkeleton
  | TypeCombatSkeleton;

export type TypeFetch = TypeRituals | TypeArticles | TypeStands | TypeCombat;
