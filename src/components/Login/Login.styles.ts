import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  loading: {
    position: 'absolute',
    width: 'calc(100% + 60px)',
    height: 'calc(100% + 60px)',
    top: -30,
    left: -30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 10,
    pointerEvents: 'none',
    opacity: 0,
    transition: 'opacity 200ms ease',
  },

  showLoading: {
    opacity: 1,
  },

  frameWrapper: {
    width: '100%',
  },

  title: {
    fontSize: '1.5rem',
    fontFamily: 'Arounder',
    marginBlockEnd: '2rem',
    textShadow: `0 0 2px ${theme.colors.maitreya[3]}`,

    [theme.fn.smallerThan('lg')]: {
      width: 'auto',
    },
  },

  inputWrapper: {
    width: 400,
    [theme.fn.smallerThan('lg')]: {
      width: '100%',
    },
  },
  showInput: {
    padding: [5, 10],
    maxWidth: 500,
  },

  frame: {
    width: 700,

    [theme.fn.smallerThan('lg')]: {
      width: '100%',
    },
  },

  error: {
    color: '#FF3333',
    stroke: '#FF3333',
    fill: '#FF3333',
  },

  errorText: {
    color: '#FF3333',
    fontFamily: 'Arounder',
    maxWidth: 300,
    textShadow: '0 0 1px #FF3333',
    '& *': {
      color: '#FF3333',
    },
  },
}));
