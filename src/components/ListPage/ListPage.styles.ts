import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    margin: 'auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },

  content: {
    width: '100%',
  },

  link: {
    '& + &': {
      paddingTop: 30,
    },
  },

  title: {
    textAlign: 'left',
  },
}));
