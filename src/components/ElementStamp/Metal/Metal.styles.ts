import { createStyles, keyframes } from '@mantine/core';

const circle = keyframes({
  from: {
    strokeDashoffset: 2800,
  },
  to: {
    strokeDashoffset: 0,
  },
});

const move = keyframes({
  from: {
    y: 0,
  },
  to: {
    y: -1000,
  },
});

export default createStyles(() => ({
  circle: {
    strokeDasharray: 2800,
    animation: `${circle} 250ms ease-in forwards`,
    animationDelay: '700ms',
  },

  mask: {
    animation: `${move} 300ms ease-in forwards`,
    animationDelay: '700ms',
  },
}));
