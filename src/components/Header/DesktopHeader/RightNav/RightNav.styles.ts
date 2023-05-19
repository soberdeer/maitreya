import { createStyles, em, getBreakpointValue } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    width: '100wv',
    userSelect: 'none',

    [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.sm))})`]: {
      padding: '0.75rem 1rem',
    },
  },
  container: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, auto)',
    padding: '0 1rem',

    [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.sm))})`]: {
      padding: '0 2rem',
    },

    [`@media (min-width: ${em(getBreakpointValue(theme.breakpoints.xl))})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
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

  menuItem: {
    height: '3.5rem',
    lineHeight: '3.5rem',

    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.sm) - 1)})`]: {
      height: '2.5rem',
      lineHeight: '2.5rem',
    },
  },

  button: {
    appearance: 'none',
    background: 'none',
    fontSize: '1rem',
  },

  menuText: {
    whiteSpace: 'nowrap',
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.xl) - 1)})`]: {
      display: 'none',
    },
  },
}));
