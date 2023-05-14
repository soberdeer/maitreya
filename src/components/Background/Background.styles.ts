import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  root: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  backgroundImage: {
    zIndex: 0,
    filter: 'hue-rotate(0deg) brightness(1) blur(10px)',
    transition: 'filter 200ms ease',
  },

  redImage: {
    filter: 'hue-rotate(180deg) brightness(0.8) blur(10px)',
  },
  front: {
    zIndex: 1,
  },
  back: {
    zIndex: 0,
  },
  overlay: {
    backgroundColor: 'black',
    opacity: 0.6,
    zIndex: 1,
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    transition: 'backgroundColor 200ms ease',
  },
}));
