import { TECHNIC_TYPES } from '@src/util/constants';
import { Stand } from './Stand';
import { Melee } from './Melee';
import { Navigation } from './Navigation';
import { Shooting } from './Shooting';
import { Telepathy } from './Telepathy';
import { Protection } from './Protection';
import { Recovery } from './Recovery';
import { Debuff } from './Debuff';

export const ICONS_MAP = {
  [TECHNIC_TYPES.stand]: Stand,
  [TECHNIC_TYPES.melee]: Melee,
  [TECHNIC_TYPES.navigation]: Navigation,
  [TECHNIC_TYPES.debuff]: Debuff,
  [TECHNIC_TYPES.shooting]: Shooting,
  [TECHNIC_TYPES.telepathy]: Telepathy,
  [TECHNIC_TYPES.protection]: Protection,
  [TECHNIC_TYPES.recovery]: Recovery,
};
