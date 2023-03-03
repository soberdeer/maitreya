import { Compass, PlusCircle, Shield, Crosshair, Rss, Link, Circle } from 'react-feather';
import { TECHNIC_TYPES } from '../../util/constants';

const size = { size: 40 };

const iconsMap = {
  [TECHNIC_TYPES.stand]: {
    icon: (props) => <Circle color="#748FFC" {...size} {...props} />,
    circle: true,
  },
  [TECHNIC_TYPES.melee]: {
    icon: (props) => <Link color="#F06595" {...size} {...props} />,
    circle: true,
  },
  [TECHNIC_TYPES.navigation]: {
    icon: (props) => <Compass color="#4DABF7" {...size} {...props} />,
    circle: false,
  },
  [TECHNIC_TYPES.shooting]: {
    icon: (props) => <Crosshair color="#FF922B" {...size} {...props} />,
    circle: false,
  },
  [TECHNIC_TYPES.telepathy]: {
    icon: (props) => <Rss color="#A9E34B" {...size} {...props} />,
    circle: true,
  },
  [TECHNIC_TYPES.protection]: {
    icon: (props) => <Shield color="#51CF66" {...size} {...props} />,
    circle: true,
  },
  [TECHNIC_TYPES.recovery]: {
    icon: (props) => <PlusCircle color="#FA5252" {...size} {...props} />,
    circle: false,
  },
};

export default iconsMap;
