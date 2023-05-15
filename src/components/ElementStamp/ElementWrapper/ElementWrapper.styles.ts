import { createStyles, keyframes } from '@mantine/core';

const circle = keyframes({
  from: {
    strokeDashoffset: 100,
  },
  to: {
    strokeDashoffset: 0,
  },
});

export default createStyles(() => ({
  root: {
    position: 'relative',
    width: 26,
    height: 26,
  },

  circleSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  circle: {
    strokeDasharray: 100,
    // animation: `${circle} 500ms ease-in forwards`,
    // animationDelay: '500ms',
  },
}));
