import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  filterButton: {
    width: 20,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdown: {
    backgroundColor: 'rgba(0, 248, 248, 0.07)',
    border: `1px solid ${theme.colors.maitreya[3]}`,
  },

  item: {
    backgroundColor: 'transparent',
    display: 'flex',
    color: theme.colors.maitreya[3],
    transition: 'color 100ms ease, background-color 100ms ease',

    '&:hover': {
      backgroundColor: 'rgba(0, 248, 248, 0.07)',
      color: theme.colors.maitreya[2],
    },
  },
}));
