import { createStyles, em, getBreakpointValue } from '@mantine/core';

export default createStyles((theme) => ({
  padding: {
    paddingTop: 40,
  },
  menuItem: {
    height: '3.5rem',
    lineHeight: '3.5rem',

    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.sm) - 1)})`]: {
      height: '2.5rem',
      lineHeight: '2.5rem',
    },
  },
  menuText: {
    whiteSpace: 'nowrap',
    fontSize: '1.1rem',
  },

  block: {
    display: 'block',
  },
}));
