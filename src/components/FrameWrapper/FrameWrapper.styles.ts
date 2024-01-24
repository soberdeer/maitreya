import { createStyles, em, getBreakpointValue } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    zIndex: -1,
  },

  content: {
    position: 'relative',
    display: 'grid',
    rowGap: '0.5rem',
    overflow: 'hidden',
    border: '1px solid transparent',
    padding: '2rem 4rem',
    textAlign: 'center',

    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.sm))})`]: {
      padding: '2rem 0.75rem',
    },
  },

  default: {
    '& path[data-name="line"]': {
      transition: 'color 200ms ease',
      color: theme.colors.maitreya[3],
    },
    '& path[data-name="bg"]': {
      transition: 'color 200ms ease',
      color: theme.fn.rgba(theme.colors.maitreya[9], 0.2),
    },
  },

  red: {
    '& path[data-name="line"]': {
      transition: 'color 200ms ease',
      color: '#FF3333',
    },
    '& path[data-name="bg"]': {
      transition: 'color 200ms ease',
      color: theme.fn.rgba('#260D0D', 0.5),
    },
  },

  green: {
    '& path[data-name="line"]': {
      transition: 'color 200ms ease',
      color: theme.colors.green[5],
    },
    '& path[data-name="bg"]': {
      transition: 'color 200ms ease',
      color: theme.fn.rgba(theme.fn.darken(theme.colors.green[9], 0.9), 0.5),
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
}));
