import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 30,
    alignItems: 'flex-start',

    '& p': {
      marginBlockEnd: 0,
    },
  },

  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
  },

  key: {
    fontSize: theme.fontSizes.xl,
    fontFamily: 'Arounder, sans-serif',
  },

  title: {
    textAlign: 'left',
    // marginBlockStart: 0,
    '@media screen and (max-width: 720px)': {
      fontSize: '1.4rem',
    },
  },

  description: {
    paddingTop: 30,
  },

  videoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },

  text: {
    fontFamily: 'Arounder',
  },

  link: {
    fontFamily: 'Arounder',
    color: theme.colors.maitreyaSecondary[4],

    '&:hover': {
      color: theme.colors.maitreyaSecondary[2],
    },
  },

  level: {
    fontSize: '1.5rem',
  },
}));
