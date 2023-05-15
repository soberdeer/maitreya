import { createStyles, getStylesRef } from '@mantine/core';

export default createStyles((theme) => ({
  // content: {
  //   backgroundColor: 'transparent',
  //   // borderRadius: 0,
  // },

  body: {
    backgroundColor: '#082221',
    // border: '1px solid #0ff',
  },

  searchInput: {
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: '#082221',
    border: `1px solid ${theme.colors.maitreya[3]}`,
    color: theme.colors.maitreya[3],
    // borderColor: theme.colors.maitreya[3],
    borderBottom: `0.0625rem solid ${theme.colors.maitreya[3]} !important`,

    '&:hover': {
      borderColor: theme.colors.maitreya[3],
      backgroundColor: 'rgba(0,255,255,0.3)',
      boxShadow: 'none',
    },

    '&:focus, &:focus-within': {
      borderColor: theme.colors.maitreya[3],
    },

    '&:focus': {
      backgroundColor: 'rgba(0,255,255,0.1)',
      boxShadow: 'none',
    },
  },

  nothingFound: {
    color: `${theme.colors.maitreya[3]} !important`,
    fontFamily: 'Arounder, sans-serif',
  },

  actionsGroup: {
    color: theme.colors.maitreya[3],
    fontFamily: 'Arounder, sans-serif',
    letterSpacing: 1.3,
    paddingBottom: theme.spacing.md,
  },

  action: {
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
    fontFamily: 'Arounder, sans-serif',
  },

  actionDescription: {
    ref: getStylesRef('actionDescription'),
    color: theme.colors.maitreya[3],
    // fontFamily: 'Arounder, sans-serif',
  },
}));
