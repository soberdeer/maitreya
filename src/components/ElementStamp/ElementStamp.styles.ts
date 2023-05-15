import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {},
  group: {
    marginTop: 20,

    '& + &': {
      marginTop: 50,
    },
  },

  deleteButton: {
    display: 'flex',
    alignItems: 'center',
  },

  idea: {
    marginBottom: 0,
  },

  disabled: {
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  strike: {
    position: 'absolute',
    top: 'calc(50% - 1px)',
    left: -5,
    width: 'calc(100% + 10px)',
    height: 2,
    pointerEvents: 'none',
    transition: 'opacity 100ms ease',
    backgroundColor: theme.colors.maitreya[3],
  },

  error: {
    fontSize: '1.1rem',
    color: 'red',

    '& *': {
      fontSize: '1.1rem',
      color: 'red',
    },
  },

  loading: {
    position: 'absolute',
    width: 'calc(100% + 60px)',
    height: 'calc(100% + 60px)',
    top: -30,
    left: -30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.maitreya[9],
    zIndex: 10,
    pointerEvents: 'none',
    opacity: 0,
    transition: 'opacity 200ms ease',
  },

  overlay: {
    opacity: 1,
    pointerEvents: 'auto',
  },
}));
