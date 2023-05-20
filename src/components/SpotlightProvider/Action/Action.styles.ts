import { createStyles, getStylesRef } from '@mantine/core';

export default createStyles((theme) => ({
  action: {
    padding: theme.spacing.sm,
    width: '100%',
    transition: 'background-color 100ms ease, color 100ms ease',
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

  title: {
    color: theme.colors.maitreyaSecondary[3],
    fontSize: '1.1rem',
    fontFamily: '"Arounder", sans-serif',
  },

  description: {
    ref: getStylesRef('actionDescription'),
    color: 'rgba(0, 255, 255, 0.8)',
    fontSize: '0.9rem',
    transition: 'color 100ms ease',
    // opacity: 0.8
    // fontFamily: '"Arounder", sans-serif',
  },
}));
