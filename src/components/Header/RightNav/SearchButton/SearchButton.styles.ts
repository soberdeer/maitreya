import { createStyles, keyframes } from '@mantine/core';

export const circle = keyframes({
  from: {
    strokeDashoffset: 45,
  },
  to: {
    strokeDashoffset: 0,
  },
});

export const line = keyframes({
  from: {
    strokeDashoffset: 10,
  },
  to: {
    strokeDashoffset: 0,
  },
});

export default createStyles((theme) => ({
  root: {
    display: 'block',
    margin: 0,
  },

  circle: {
    stroke: theme.colors.maitreya[3],
    strokeDasharray: 45,
    strokeDashoffset: 45,
    animation: `${circle} 200ms ease-in-out `,
    animationDelay: '700ms',
    animationFillMode: 'forwards',
  },

  line: {
    stroke: theme.colors.maitreya[3],
    strokeDasharray: 10,
    strokeDashoffset: 0,
    animation: `${line} 100ms ease-in-out `,
    animationFillMode: 'forwards',
    animationDelay: '700ms',
  },
}));
