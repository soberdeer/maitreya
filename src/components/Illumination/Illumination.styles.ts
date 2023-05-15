import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  root: {
    zIndex: -1,
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    transitionProperty:
      'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, outline',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-out',
  },
}));
