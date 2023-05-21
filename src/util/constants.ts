import { KeysType, SchemeType } from './types';

export const SCHEME_MAP: Record<KeysType, SchemeType> = {
  technics: {
    query: 'combat',
    additionalQueries: ['stands'],
    title: 'Техники',
  },
  setting: {
    query: 'articles',
    title: 'Сеттинг',
    filter: {
      key: 'tags',
      value: 'сеттинг',
    },
  },
  models: {
    query: 'articles',
    title: 'Модели',
    filter: {
      key: 'tags',
      value: 'модели',
    },
  },
  rituals: {
    query: 'rituals',
    title: 'Ритуалы',
  },
};

export const TECHNIC_TYPES = {
  stand: 'Стойки',
  melee: 'Ближний бой',
  navigation: 'Навигация',
  shooting: 'Стрельба',
  telepathy: 'Телепатия',
  protection: 'Защита',
  recovery: 'Восстановление',
};
