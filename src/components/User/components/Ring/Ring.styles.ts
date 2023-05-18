import { createStyles, keyframes } from '@mantine/core';

const slideRight = keyframes({
  '0%': { marginTop: 5 },
  '10%': { marginTop: 5 },
  '95%': { marginTop: -5 },
  '100%': { marginTop: -5 },
});

export default createStyles(() => ({
  st0: {
    fill: 'none',
    strokeWidth: 42,
    strokeMiterlimit: 10,
    transform: 'scaleX(-1), translateX(100%)',
  },
  st1: {
    fill: 'none',
    strokeWidth: 42,
    strokeMiterlimit: 10,
    strokeDasharray: '50, 90, 200, 30, 40, 0',
  },
  st2: {
    // strokeDasharray: 2500,
    fill: 'none',
    strokeWidth: 42,
    strokeMiterlimit: 10,
    strokeLinecap: 'square',
  },
  st3: {
    fill: 'none',
    strokeMiterlimit: 10,
    strokeWidth: 16,
    strokeLinecap: 'square',
  },

  avatarWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
  },

  avatar: {
    marginTop: -5,
    animationName: `${slideRight}`,
    animationDuration: '2000ms',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
  },
}));
