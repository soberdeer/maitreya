import { createStyles, em, getBreakpointValue } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    display: 'grid',
    gridAutoFlow: 'column',
    columnGap: '0.5rem',
    listStyle: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1rem',
    marginBlockStart: 0,
    marginBlockEnd: 0,
    paddingInlineStart: 0,
    paddingLeft: 40,
    height: '100%',

    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.sm) - 1)})`]: {
      fontSize: '0.875rem',
      paddingLeft: 0,
    },
  },

  vertical: {
    display: 'flex',
    flexDirection: 'column',
    gridAutoFlow: 'unset',
    columnGap: 'unset',
    gap: '1rem',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
}));
