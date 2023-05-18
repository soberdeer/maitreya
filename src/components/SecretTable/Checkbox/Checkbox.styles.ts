import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  input: {
    borderRadius: 0,
    borderColor: theme.colors.maitreya[3],
    backgroundColor: 'rgba(0, 0, 0, 0.2)',

    '&:checked': {
      borderColor: theme.colors.maitreya[3],
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  },

  icon: {
    color: `${theme.colors.maitreya[3]} !important`,
    width: '100%',
  },
}));
