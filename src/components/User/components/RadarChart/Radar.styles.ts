import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    width: 300,
    height: 300,
  },
  radar: {
    color: theme.colors.maitreya[3],
    '& text': {
      color: theme.colors.maitreya[3],
    },
  },

  radarContainer: {
    height: 0,
    transition:
      'width 300ms ease, height 300ms ease, opacity 300ms ease, border-radius 300ms ease, transform 300ms ease',
    opacity: 0,
    overflow: 'hidden',
    transformOrigin: 'top left',
    borderRadius: '50%',
    width: 0,
  },

  active: {
    opacity: 1,
    width: 300,
    height: 300,
    borderRadius: 0,
  },
  tooltip: {
    backgroundColor: theme.fn.rgba(theme.colors.maitreya[3], 0.1),
    border: `1px solid ${theme.colors.maitreya[8]}`,
  },
}));
