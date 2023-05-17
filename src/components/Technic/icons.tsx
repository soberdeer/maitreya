import { Compass, PlusCircle, Shield, Crosshair, Rss, Link, Circle } from 'react-feather';
import { TECHNIC_TYPES } from '@src/util/constants';

const size = { size: 40 };

export const iconsMap = {
  [TECHNIC_TYPES.stand]: {
    icon: Circle,
    props: {
      color: '#748FFC',
      ...size,
    },
    circle: true,
  },
  [TECHNIC_TYPES.melee]: {
    icon: Link,
    props: { color: '#F06595', ...size },
    circle: true,
  },
  [TECHNIC_TYPES.navigation]: {
    icon: Compass,
    props: { color: '#4DABF7', ...size },
    circle: false,
  },
  [TECHNIC_TYPES.shooting]: {
    icon: Crosshair,
    props: { color: '#FF922B', ...size },
    circle: false,
  },
  [TECHNIC_TYPES.telepathy]: {
    icon: Rss,
    props: { color: '#A9E34B', ...size },
    circle: true,
  },
  [TECHNIC_TYPES.protection]: {
    icon: Shield,
    props: { color: '#51CF66', ...size },
    circle: true,
  },
  [TECHNIC_TYPES.recovery]: {
    icon: PlusCircle,
    props: { color: '#FA5252', ...size },
    circle: false,
  },
};
