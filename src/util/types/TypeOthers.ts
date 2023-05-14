import { Entry, EntrySkeletonType } from 'contentful';

type Levels = 'Ученик' | 'Адепт' | 'Мастер';
type TechnicType =
  | 'Восстановление'
  | 'Ближний бой'
  | 'Стрельба'
  | 'Телепатия'
  | 'Навигация'
  | 'Защита';

export type TechnicStateType = 'Только в фуге' | 'Только вне фуги' | 'И в фуге, и вне фуги';
export type AllTechnicStateType = TechnicStateType | 'Все';

export type KeysType = 'technics' | 'setting' | 'models' | 'rituals';
export type ElementsEngKeys = 'water' | 'wood' | 'fire' | 'earth' | 'metal';
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

export type LevelType<T extends EntrySkeletonType> = {
  pupil: Entry<T>[];
  adept: Entry<T>[];
  master: Entry<T>[];
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
