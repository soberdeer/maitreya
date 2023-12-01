import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  frameWrapper: {
    '& + &': {
      marginTop: 20,
    },
  },

  dateWrapper: {
    display: 'flex',
    width: '100%',
    marginTop: 40,
    justifyContent: 'flex-end',
  },
}));
