import { createStyles } from '@mantine/core';

export default createStyles({
  link: {
    '& + &': {
      marginTop: 10,
    },
  },

  wrapper: {
    marginTop: 20,
    textAlign: 'left',
  },
});
