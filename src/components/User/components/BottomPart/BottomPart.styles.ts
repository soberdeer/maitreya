import { createStyles } from '@mantine/core';

export default createStyles({
  root: {
    paddingTop: 40,
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

  data: {
    display: 'flex',
    flexDirection: 'column',
  },

  block: {
    maxWidth: 'calc(50% - 100px)',
    display: 'flex',
    flexDirection: 'column',

    '@media screen and (max-width: 720px)': {
      maxWidth: '100%',
    },
  },
});
