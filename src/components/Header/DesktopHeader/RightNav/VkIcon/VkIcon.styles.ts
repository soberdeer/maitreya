import { createStyles, keyframes } from '@mantine/core';

export const icon = keyframes({
  from: {
    strokeDashoffset: 300,
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
  icon: {
    fill: 'none',
    stroke: theme.colors.maitreya[3],
    strokeWidth: 3,
    strokeDasharray: 300,
    animation: `${icon} 1000ms ease-in-out`,
  },
}));
