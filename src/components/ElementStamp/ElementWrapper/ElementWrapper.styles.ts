import { createStyles } from '@mantine/core';

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
    transition: 'stroke-dashoffset 0.4s ease',
  },
}));
