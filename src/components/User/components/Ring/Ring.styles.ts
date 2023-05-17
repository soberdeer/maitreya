import { createStyles, keyframes } from '@mantine/core';

const slideRight = keyframes({
  '0%': { marginTop: 5 },
  '10%': { marginTop: 5 },
  '95%': { marginTop: -5 },
  '100%': { marginTop: -5 },
});

export default createStyles((theme) => ({
  st0: {
    fill: 'none',
    stroke: theme.colors.maitreya[3],
    strokeWidth: 42,
    strokeMiterlimit: 10,
    strokeDasharray: '12.1947, 12.1947, 12.1947, 12.1947, 12.1947, 12.1947',
  },
  st1: {
    fill: 'none',
    stroke: theme.colors.maitreya[3],
    strokeWidth: 42,
    strokeMiterlimit: 10,
    strokeDasharray: '50, 90, 200, 30, 40, 0',
  },
  st2: {
    fill: 'none',
    stroke: theme.colors.maitreya[3],
    strokeWidth: 42,
    strokeMiterlimit: 10,
    strokeLinecap: 'square',
    strokeDasharray: '120, 20, 110, 20, 140',
  },
  st3: {
    fill: 'none',
    stroke: theme.colors.maitreya[3],
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
