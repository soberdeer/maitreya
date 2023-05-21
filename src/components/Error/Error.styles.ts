import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  text: {
    color: '#FF3333',
    textShadow: '0 0 2px #FF3333',
    textAlign: 'center',
    '& *': {
      textAlign: 'center',
    },
  },

  green: {
    filter: 'saturate(1.5)',
    color: theme.colors.green[4],
    textShadow: `0 0 2px ${theme.colors.green[2]}`,
  },
}));
