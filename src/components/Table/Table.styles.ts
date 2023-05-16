import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {},
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

  tableWrapper: {
    width: '100%',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
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

    '& th, & td': {
      fontSize: '.875rem',
      padding: '0.5rem 0.75rem',
      verticalAlign: 'top',
    },

    '& th': {
      borderBottom: `1px solid ${theme.colors.maitreya[4]} !important`,
    },
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
}));
