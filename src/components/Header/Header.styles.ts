import { createStyles, em, getBreakpointValue } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    width: '100vw',
    userSelect: 'none',
    zIndex: 10,
    position: 'fixed',

    [`@media (min-width: ${getBreakpointValue(theme.breakpoints.md)})`]: {
      padding: '0.75rem 1rem',
    },
  },
  container: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '40px auto auto auto',
    backgroundColor: theme.fn.rgba(theme.colors.maitreya[9], 0.3),
    padding: '0 1rem',

    [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.md))})`]: {
      padding: '0 2rem',
    },

    [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.xl))})`]: {
      gridTemplateColumns: '40px 1fr 1fr 1fr',
    },
  },
  frame: {
    zIndex: -1,
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    transitionProperty:
      'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, outline',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-out',
  },
  section: {
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    columnGap: '1rem',
  },
  left: {
    justifyContent: 'flex-start',
  },
  center: {
    justifyContent: 'center',
  },
  right: {
    justifyContent: 'flex-end',
  },
}));
