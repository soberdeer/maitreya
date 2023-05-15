import { createStyles, getStylesRef, keyframes } from '@mantine/core';

export const spin = keyframes({
  '0%': {
    transform: 'rotate(160deg)',
    opacity: 0,
  },
  '50%': {
    transform: 'rotate(145deg)',
    opacity: 1,
  },
  '100%': {
    transform: 'rotate(-320deg)',
    opacity: 0,
  },
});

export const spinBackward = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export default createStyles((theme) => ({
  root: {
    zIndex: 1000,
    position: 'relative',
    display: 'block',
    minHeight: 90,
    transition: 'all 250ms ease-out',
    opacity: 1,
    backgroundColor: ''
  },
  circle: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    display: 'block',

    borderTop: `5px solid ${theme.colors.maitreya[3]}`,
    borderBottom: `5px solid ${theme.colors.maitreya[3]}`,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',

    borderRadius: '50%',
    backgroundColor: 'transparent',
    boxShadow: `0 0 4px ${theme.colors.maitreya[3]}`,
    transition: 'all 250ms ease-out',
  },
  circle1: {
    marginLeft: -25,
    marginTop: -25,
    width: 50,
    height: 50,
    animation: `${spin} 750ms infinite linear`,
  },

  circle2: {
    ref: getStylesRef('circle2'),
    marginLeft: -15,
    marginTop: -15,
    width: 30,
    height: 30,
    animation: `${spinBackward} 750ms infinite linear`,
  },

  small: {
    display: 'inline-block',
    minWidth: 16,
    minHeight: 16,
    verticalAlign: 'middle',

    [`& .${getStylesRef('circle2')}`]: {
      marginLeft: -8,
      marginTop: -8,
      width: 16,
      height: 16,

      borderTop: `3px solid ${theme.colors.maitreya[3]}`,
      borderBottom: `3px solid ${theme.colors.maitreya[3]}`,
      borderLeft: '3px solid transparent',
      borderRight: '3px solid transparent',
    },
  },

  full: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
}));
