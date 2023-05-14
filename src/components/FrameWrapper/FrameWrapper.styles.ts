import { createStyles } from '@mantine/core';

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
  },

  default: {
    '& path[data-name="decoration"]': { color: theme.colors.maitreya[3] },
    '& path[data-name="shape"]': { color: theme.fn.rgba(theme.fn.darken(theme.colors.maitreya[9], 0.8), 0.7) },
  },

  red: {
    '& path[data-name="decoration"]': { color: '#FF3333' },
    '& path[data-name="shape"]': { color: theme.fn.rgba('#260D0D', 0.5) },
  },
}));
