import { createStyles, getStylesRef } from '@mantine/core';
import { defaultPalette } from '../../../util/theme';

export default createStyles((theme) => ({
  action: {
    padding: theme.spacing.sm,
    width: '100%',
    '&[data-hovered]': {
      backgroundColor: 'rgba(0,255,255,0.2)',
      boxShadow: 'none',

      [`& .${getStylesRef('actionDescription')}`]: {
        color: defaultPalette.primary.main,
      },
    },
    '&:hover': {
      backgroundColor: '#126564',
    },
  },

  title: {
    color: defaultPalette.secondary.main,
    fontFamily: '"Arounder", sans-serif',
  },

  description: {
    ref: getStylesRef('actionDescription'),
    color: 'rgba(0, 255, 255, 0.8)',
    // opacity: 0.8
    // fontFamily: '"Arounder", sans-serif',
  },
}));
