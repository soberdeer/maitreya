import { TECHNIC_TYPES } from '@src/util/constants';

export const COLORS_MAP_EN: Record<keyof typeof TECHNIC_TYPES, string> = {
  stand: '#748FFC',
  melee: '#F06595',
  navigation: '#4DABF7',
  shooting: '#FF922B',
  debuff: '#FFD43B',
  telepathy: '#A9E34B',
  protection: '#51CF66',
  recovery: '#FA5252',
};

export const COLORS_MAP_RU = {
  [TECHNIC_TYPES.stand]: '#748FFC',
  [TECHNIC_TYPES.melee]: '#F06595',
  [TECHNIC_TYPES.navigation]: '#4DABF7',
  [TECHNIC_TYPES.shooting]: '#FF922B',
  [TECHNIC_TYPES.debuff]: '#FFD43B',
  [TECHNIC_TYPES.telepathy]: '#A9E34B',
  [TECHNIC_TYPES.protection]: '#51CF66',
  [TECHNIC_TYPES.recovery]: '#FA5252',
};
