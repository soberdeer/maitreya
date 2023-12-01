import { createStyles, getStylesRef, keyframes } from '@mantine/core';

const bounce = keyframes({
  '0%, 100%': { transform: 'translateX(0%)' },
  '15%, 45%, 75%': { transform: 'translateX(-2%)' },
  '30%, 60%': { transform: 'translateX(2%)' },
});

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
    ref: getStylesRef('title'),
    fontSize: '1.5rem',
    marginBlockEnd: '2rem',
    textShadow: `0 0 2px ${theme.colors.maitreya[3]}`,
    transition: 'color 200ms ease, text-shadow 200ms ease',

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
    animation: `${bounce} 300ms ease-in-out forwards`,
    [`& .${getStylesRef('title')}`]: {
      color: '#FF3333',
      textShadow: '0 0 2px #FF3333',
    },
  },

  errorText: {
    color: '#FF3333',
    maxWidth: 300,
    textShadow: '0 0 1px #FF3333',
    '& *': {
      color: '#FF3333',
    },
  },
}));
