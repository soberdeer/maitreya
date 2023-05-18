import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    position: 'relative',

    '@media screen and (max-width: 720px)': {
      maxWidth: 'calc(100vw - 16px*4)',
    },
  },

  flex: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
  },

  title: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,

    '@media screen and (max-width: 720px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  text: {
    // marginBottom: 0,
    display: 'flex',
  },

  key: {
    color: theme.colors.maitreya[4],
    textShadow: 'none',
  },

  value: {
    marginBottom: 0,
    marginLeft: 10,
  },

  house: {},

  flag: {
    width: 48,
    height: 70,
  },

  stats: {
    paddingTop: 30,
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',

    '@media screen and (max-width: 720px)': {
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
  },

  mainStats: {
    paddingTop: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  mainStatsText: {
    fontSize: 24,
    fontFamily: 'Arounder',
  },

  logoutWrapper: {
    color: theme.colors.maitreyaSecondary[4],
    position: 'absolute',
    top: 0,
    right: -30,
    display: 'flex',
    gap: 10,

    '@media screen and (max-width: 540px)': {
      right: 0,
    },
  },

  changes: {
    color: theme.colors.maitreya[4],
    cursor: 'pointer',
  },
}));
