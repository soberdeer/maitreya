import { createStyles, keyframes } from '@mantine/core';

const steaming = keyframes({
  '50%': {
    transform: 'translateY(-2px)',
  },
});

export default createStyles(() => ({
  coffeeCup: {
    filter: 'saturate(1.5)',
  },
  steam: {
    animation: `${steaming} 2500ms ease infinite`,
  },

  steam1: {
    animationDelay: '700ms',
  },
  steam2: {
    animationDelay: '500ms',
  },
  steam3: {
    animationDelay: '0ms',
  },

  cup: {},
  coffee: {},
}));
