import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    '&::-webkit-scrollbar': {
      display: 'none',
    },

    [theme.fn.smallerThan('lg')]: {
      width: 'auto',
      overflowX: 'scroll',
    },
  },
  asset: {
    '& picture': {
      backgroundColor: 'transparent',
    },
  },

  imageWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  underline: {
    backgroundColor: theme.colors.maitreyaSecondary[3],
    height: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },

  header: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
    color: theme.colors.maitreya[3],
    marginBottom: 0,
  },

  cell: {
    color: theme.colors.maitreya[3],
    marginBlockStart: 0,
    marginBlockEnd: 0,
    marginBottom: 0,
  },

  table: {
    borderCollapse: 'separate',
    borderSpacing: '0.25rem',
    width: '100%',
    textAlign: 'left',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    overflowX: 'auto',

    '& th, & td': {
      fontSize: '.875rem',
      padding: '0.5rem 0.75rem',
      verticalAlign: 'top',
    },

    // '& th': {
    //   borderBottom: `1px solid ${theme.colors.maitreya[4]} !important`,
    // },
    '& td': {
      borderTop: 'none !important',
    },
    '& tr': {
      backgroundColor: theme.fn.rgba(theme.colors.maitreya[3], 0.03),
      transition: 'background-color 200ms ease',

      '&:hover': {
        backgroundColor: theme.fn.rgba(theme.colors.maitreya[3], 0.1),
      },
    },

    '& thead tr:hover': {
      backgroundColor: theme.fn.rgba(theme.colors.maitreya[3], 0.03),
    },
    // minWidth: 850,
    // '& .': {
    //   hyphens: 'auto',
    //
    //   '@media screen and (max-width: 540px)': {
    //     minWidth: 150,
    //   },
    // },
    // '&::-webkit-scrollbar': {
    //   display: 'none',
    // },
  },

  listItem: {
    '&::marker': {
      content: '""',
      display: 'none',
    },
  },

  listItemContent: {
    alignItems: 'flex-start',
    marginBottom: 0,
  },

  overflow: {
    position: 'absolute',
    top: 0,
    width: 50,
    height: '100%',
    zIndex: 2,
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 200ms ease',
  },

  overflowLeft: {
    left: 0,
    background: theme.fn.linearGradient(90, '#051e1d', 'transparent'),
  },
  overflowRight: {
    right: 0,
    background: theme.fn.linearGradient(90, 'transparent', '#051e1d'),
  },

  show: {
    opacity: 1,
    pointerEvents: 'auto',
  },
}));
