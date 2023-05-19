import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  desktop: {
    width: '100vw',
    userSelect: 'none',
    zIndex: 10,
    position: 'fixed',
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  mobile: {
    width: '100vw',
    userSelect: 'none',
    zIndex: 10,
    position: 'fixed',
    display: 'none',

    [theme.fn.smallerThan('sm')]: {
      display: 'block',
    },
  },
}));
