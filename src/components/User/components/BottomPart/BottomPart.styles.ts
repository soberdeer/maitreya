import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 100,

    '@media screen and (max-width: 720px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 30,
    },
  },

  flex: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
  },

  text: {
    display: 'flex',
  },

  techName: {
    marginBlockEnd: 0,
  },

  data: {
    display: 'flex',
    flexDirection: 'column',
  },

  chevron: {
    color: theme.colors.maitreyaSecondary[4],
  },

  block: {
    maxWidth: 'calc(50% - 100px)',
    display: 'flex',
    flexDirection: 'column',

    '@media screen and (max-width: 720px)': {
      maxWidth: '100%',
    },
  },

  single: {
    maxWidth: '100%',
  },
}));
