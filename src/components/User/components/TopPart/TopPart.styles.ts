import { createStyles } from '@mantine/core';

type Props = { longName: boolean };

export default createStyles((theme, { longName }: Props) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 30,
    gap: 20,

    '@media screen and (max-width: 720px)': {
      flexDirection: 'column',
      alignItems: 'center',
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
    wordBreak: 'break-word',
    hyphens: 'auto',
    marginBlockEnd: 0,
    // color: 'rgb(0, 255, 255)',
  },

  styled: {},

  name: {
    fontSize: longName ? '1.5rem' : '2rem',
    marginBlockEnd: 0,
    marginBlockStart: 0,

    '@media screen and (max-width: 720px)': {
      fontSize: ['1.5rem', '!important'],
      wordBreak: 'break-word',
      hyphens: 'auto',
    },
  },

  lg: {
    fontSize: theme.fontSizes.lg,
  },

  xl: {
    fontSize: theme.fontSizes.xl,
  },
}));
