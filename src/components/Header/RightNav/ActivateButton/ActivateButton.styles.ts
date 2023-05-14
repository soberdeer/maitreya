import { createStyles, keyframes } from '@mantine/core';

export const strikethrough = keyframes({
  from: {
    strokeDashoffset: 50,
  },
  to: {
    strokeDashoffset: 0,
  },
});

export const connect = keyframes({
  from: {
    strokeDashoffset: 0,
  },
  to: {
    strokeDashoffset: 4,
  },
});

export const defaultLines = keyframes({
  from: {
    strokeDashoffset: 150,
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

  line: {
    transform: 'translate(-4.12 -5.96)',
    fill: 'none',
    stroke: theme.colors.maitreya[3],
    strokeLinecap: 'round',
    strokeWidth: 2.5,
    strokeLinejoin: 'round',
  },

  iconLine: {
    strokeDasharray: 150,
    animation: `${defaultLines} 500ms ease-in-out `,
    animationDelay: '200ms',
  },

  hiddenLine: {
    stroke: 'transparent',
  },

  strikethrough: {
    stroke: theme.colors.maitreya[3],
    strokeDasharray: 50,
    strokeDashoffset: 50,
    animation: `${strikethrough} 200ms ease-in-out `,
    animationDelay: '200ms',
    animationFillMode: 'forwards',
  },

  connect: {
    strokeDasharray: 4,
    strokeDashoffset: 0,
    animation: `${connect} 100ms ease-in-out `,
    animationFillMode: 'forwards',
    animationDelay: '300ms',
  },
}));
