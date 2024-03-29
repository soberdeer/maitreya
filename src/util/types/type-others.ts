import { TypeCombat, TypeRituals, TypeStands } from '@src/util/types/content-types';

// type Levels = 'Ученик' | 'Адепт' | 'Мастер';
// type TechnicType =
//   | 'Восстановление'
//   | 'Ближний бой'
//   | 'Стрельба'
//   | 'Телепатия'
//   | 'Навигация'
//   | 'Защита';

export type TechnicStateType = 'Только в фуге' | 'Только вне фуги' | 'И в фуге, и вне фуги';
export type AllTechnicStateType = TechnicStateType | 'Все';

export type KeysType = 'technics' | 'setting' | 'models' | 'rituals';
// export type ElementsEngKeys = 'water' | 'wood' | 'fire' | 'earth' | 'metal';
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

export type LevelType<T extends TypeCombat | TypeRituals | TypeStands = TypeCombat> = {
  pupil: T[];
  adept: T[];
  master: T[];
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

export type UsersTable = {
  name: string;
  user_id: string;
  added_introjects: string;
  removed_introjects: string;
  added_convictions: string;
  removed_convictions: string;
};

export type Database = {
  users: UsersTable;
};
