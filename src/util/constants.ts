import { KeysType, SchemeType } from './types';

export const ELEMENTS = [
  {
    name: 'огонь',
    key: 'о',
  },
  {
    name: 'вода',
    key: 'в',
  },
  {
    name: 'земля',
    key: 'з',
  },
  {
    name: 'дерево',
    key: 'ж',
  },
  {
    name: 'металл',
    key: 'м',
  },
];

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
