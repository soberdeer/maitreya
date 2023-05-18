import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  text: {
    color: '#FF3333',
    textShadow: '0 0 2px #FF3333',
  },

  green: {
    color: theme.colors.green[5],
    textShadow: `0 0 2px ${theme.colors.green[5]}`,
  },
}));
