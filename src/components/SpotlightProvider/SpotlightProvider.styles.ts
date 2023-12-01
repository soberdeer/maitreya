import { createStyles, getStylesRef } from '@mantine/core';

export default createStyles((theme) => ({
  // content: {
  //   backgroundColor: 'transparent',
  //   // borderRadius: 0,
  // },

  body: {
    backgroundColor: theme.fn.rgba(theme.colors.maitreya[9], 0.8),
    // border: '1px solid #0ff',
  },

  searchInput: {
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: theme.fn.rgba(theme.colors.maitreya[9], 0.8),
    border: `1px solid ${theme.colors.maitreya[3]}`,
    color: theme.colors.maitreya[3],
    // borderColor: theme.colors.maitreya[3],
    borderBottom: `0.0625rem solid ${theme.colors.maitreya[3]} !important`,
    transition: 'color 200ms ease, border-color 200ms ease, background-color 200ms ease',

    '&::placeholder': {
      color: theme.colors.maitreya[4],
    },

    '&:hover': {
      borderColor: theme.colors.maitreya[3],
      backgroundColor: theme.colors.maitreya[7],
      boxShadow: 'none',
    },

    '&:focus, &:focus-within': {
      borderColor: theme.colors.maitreya[3],
    },

    '&:focus': {
      backgroundColor: theme.colors.maitreya[8],
      boxShadow: 'none',
    },
  },

  nothingFound: {
    color: `${theme.colors.maitreya[3]} !important`,
    fontFamily: 'sans-serif',
  },

  actionsGroup: {
    color: theme.colors.maitreya[3],
    fontFamily: 'sans-serif',
    letterSpacing: 1.3,
    fontSize: '0.9rem',
    paddingBottom: theme.spacing.md,
  },

  action: {
    transition: 'background-color 200ms ease',
    '&[data-hovered]': {
      backgroundColor: 'rgba(0,255,255,0.2)',
      boxShadow: 'none',

      [`& .${getStylesRef('actionDescription')}`]: {
        color: theme.colors.maitreya[3],
      },
    },
    '&:hover': {
      backgroundColor: '#126564',
    },
  },

  actionHighlight: {
    color: theme.colors.maitreyaSecondary[5],
    fontFamily: 'sans-serif',
  },

  actionDescription: {
    ref: getStylesRef('actionDescription'),
    color: theme.colors.maitreya[3],
    transition: 'color 200ms ease',
    // fontFamily: 'Arounder, sans-serif',
  },
}));
