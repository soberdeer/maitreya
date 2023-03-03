import { Asset, Entry, EntryCollection } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import DateTimeFormatPartTypes = Intl.DateTimeFormatPartTypes;

type Levels = 'Ученик' | 'Адепт' | 'Мастер';
type TechnicType =
  | 'Восстановление'
  | 'Ближний бой'
  | 'Стрельба'
  | 'Телепатия'
  | 'Навигация'
  | 'Защита';

export type TechnicStateType = 'Только в фуге' | 'Только вне фуги' | 'И в фуге, и вне фуги';

export type KeysType = 'technics' | 'setting' | 'models' | 'rituals';
export type ElementsEngKeys = 'water' | 'wood' | 'fire' | 'earth' | 'metal';
export type FetchType = TechnicProps | ArticleProps | RitualProps | StandProps;
export type RankGroupType =
  | 'До-офицерский состав'
  | 'Младший офицерский состав'
  | 'Старший офицерский состав'
  | 'Высший офицерский состав';
export type RankNumberType =
  | '1 - курсант, младший лейтенант, капитан 3-го ранга, контр-адмирал'
  | '2 - младший сержант, лейтенант, капитан 2-го ранга, адмирал'
  | '3 - сержант, старший лейтенант, капитан 1-го ранга, адмирал флота'
  | '4 - энсин, капитан-лейтенант, командор, адмирал системы';
export type HonorType = 'Человек Высокой Чести' | 'Человек Чести' | 'Человек без Чести';

export type LevelType<T = TechnicProps> = {
  pupil: Entry<T>[];
  adept: Entry<T>[];
  master: Entry<T>[];
};

export type StandProps = {
  level: Levels;
  restricted?: boolean;
  name: string;
  type: TechnicType;
  restricted_access?: Entry<FetchType>[];
  standard?: string[];
};

export type TechnicProps = {
  restricted: boolean;
  name: string;
  stand: Entry<StandProps>;
  state: string;
  effect: string;
  level: Levels;
  target: string;
  touch: boolean;
  type: TechnicType;
  video: Asset;
  will: number;
  elements?: string;
  description?: Document;
  restricted_access: Entry<FetchType>[];
  standard?: string[];
};

export type RitualProps = {
  action: string;
  restricted: boolean;
  description: Document;
  elements: string;
  level: Levels;
  manifest: Document;
  name: string;
  will: string;
  restricted_access: Entry<FetchType>[];
  standard?: string[];
};

export type ArticleProps = {
  name: string;
  restricted: boolean;
  tags: 'модели' | 'сеттинг';
  description: Document;
  restricted_access: Entry<FetchType>[];
  references: Entry<any>[];
};

export type HouseType = {
  name: string;
  type: 'Великий Дом' | 'Малый Дом' | 'Картель' | 'Орден';
  image: Asset;
  width: number;
  height: number;
};

export type UserProps = {
  name: string;
  code: string;
  creed?: string;
  elements: { element: string; amount: number; infinity: boolean }[];
  health: number;
  honor?: HonorType;
  homeless?: boolean;
  house?: Entry<HouseType>;
  profession?: string;
  rank_group: RankGroupType;
  rank_number: RankNumberType;
  small_house?: 'все дома';
  will: 300;
  work?: 'Мастерская группа';
  introjects?: string[];
  beliefs?: string[];
  personal_access?: Entry<FetchType>[];
  technics?: Entry<TechnicProps>[];
  rituals?: Entry<RitualProps>[];
  bio?: string;
  course?: string;
  cadet_number?: number;
  order?: Entry<HouseType>;
  avatar_profile?: Asset;
  avatar_chat?: Asset;
};

export type GroupProps = {
  name: string;
  users: EntryCollection<UserProps>;
};

export type ElementProps = {
  name: string;
  shortname: string;
  color: string;
  image: Asset;
  eng_key: ElementsEngKeys;
};

export type BaseProps = {
  id: string;
  logo: Asset;
  vk_url?: string;
  menu: { href: string; children: string }[];
  elements: Entry<ElementProps>[];
};

export type SchemeType = {
  query: string;
  additionalQueries?: string[];
  title: string;
  filter?: {
    key: string;
    value: any;
  };
};

export type BlockType = {
  name: string;
  list: Entry<ArticleProps>[];
};

export type PageProps = {
  name: string;
  slug: string;
  blocks: Entry<BlockType>[];
};

export type PostType = {
  name: string;
  date?: DateTimeFormatPartTypes;
  content: Document;
};

export type MainPageType = {
  name: string;
  top_post?: Entry<PostType>;
  posts?: Entry<PostType>[];
};
