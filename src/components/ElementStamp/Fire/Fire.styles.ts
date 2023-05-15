import { createStyles, keyframes } from '@mantine/core';

const move = keyframes({
  from: {
    y: 0,
  },
  to: {
    y: -1000,
  },
});

export default createStyles(() => ({
  mask: {
    animation: `${move} 300ms ease-in forwards`,
    animationDelay: '700ms',
  },
}));
