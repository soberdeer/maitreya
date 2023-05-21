import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },

  text: {
    marginBlockEnd: 0,
    fontSize: theme.fontSizes.lg,
    textShadow: 'none',
    fontFamily: 'Arounder',
  },
}));
