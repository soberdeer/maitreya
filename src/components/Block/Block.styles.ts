import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    margin: 'auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  content: {
    width: '100%',
  },

  link: {
    fontSize: '1.1rem',
    '& + &': {
      paddingTop: 15,
    },
  },

  title: {
    // paddingBottom: 20,
    color: theme.colors.maitreya[3],

    '& *': {
      color: theme.colors.maitreya[3],
    },
  },
}));
