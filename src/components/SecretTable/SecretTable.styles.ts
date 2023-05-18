import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {},
  loading: {
    position: 'absolute',
    width: 'calc(100% + 60px)',
    height: 'calc(100% + 60px)',
    top: -30,
    left: -30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.fn.rgba(theme.fn.darken(theme.colors.maitreya[9], 0.7), 0.4),
    zIndex: 10,
    pointerEvents: 'none',
    opacity: 0,
    transition: 'opacity 200ms ease',
  },

  overlay: {
    opacity: 1,
    pointerEvents: 'auto',
  },

  checkboxLabel: {
    color: theme.colors.maitreya[3],
    '& *': {
      color: theme.colors.maitreya[3],
    },
  },
}));
