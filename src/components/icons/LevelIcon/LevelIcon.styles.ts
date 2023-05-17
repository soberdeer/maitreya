import { createStyles, keyframes, getStylesRef } from '@mantine/core';

const border = keyframes({
  from: {
    strokeDashoffset: 1100,
  },
  to: {
    strokeDashoffset: 0,
  },
});

export default createStyles({
  border: {
    ref: getStylesRef('border'),
    strokeDasharray: 1100,
    // strokeDashoffset: 1100,
    animation: `${border} 400ms ease backwards`,
    animationDelay: '500ms',
  },

  active: {
    [`& .${border}`]: {
      animation: `${border} 400ms ease forwards`,
    },
  },
});
