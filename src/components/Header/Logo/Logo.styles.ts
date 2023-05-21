import { createStyles, keyframes } from '@mantine/core';

export const inner = keyframes({
  from: {
    strokeDashoffset: 20,
  },
  to: {
    strokeDashoffset: 0,
  },
});

export const border = keyframes({
  from: {
    strokeDashoffset: 140,
  },
  to: {
    strokeDashoffset: 0,
  },
});

export const innerBorder = keyframes({
  from: {
    strokeDashoffset: 66,
  },
  to: {
    strokeDashoffset: 0,
  },
});

export const circle = keyframes({
  from: {
    strokeDashoffset: 30,
  },
  to: {
    strokeDashoffset: 0,
  },
});

export default createStyles(() => ({
  root: {
    display: 'block',
    margin: 0,
  },
  background: {
    fill: '#1a1a1a',
  },
  border: {
    fill: 'none',
    stroke: '#fc0',
    strokeWidth: '2.73',
    strokeDasharray: 140,
    strokeLinecap: 'round',
    animation: `${border} 500ms ease-in-out`,
  },
  inner: {
    fill: 'none',
    stroke: '#fc0',
    strokeWidth: '1.5',
    strokeDasharray: 20,
    animation: `${inner} 500ms ease-in-out`,
    // strokeLinecap: 'round',
  },

  circle: {
    fill: 'none',
    stroke: '#fc0',
    strokeWidth: '1.5',
    strokeDasharray: 30,
    animation: `${circle} 500ms ease-in-out`,
  },

  innerBorder: {
    fill: 'none',
    stroke: '#fc0',
    strokeWidth: '1.5',
    strokeDasharray: 66,
    animation: `${innerBorder} 500ms ease-in-out`,
  },
}));
