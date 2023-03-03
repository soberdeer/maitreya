import { createUseStyles } from 'react-jss';
import colors from '../../styles/colors';

export default createUseStyles({
  root: {
    position: 'relative',
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
    color: colors.secondary,
    textShadow: `none`,
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

  logoutWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,

    '@media screen and (max-width: 540px)': {
      right: 10,
    },
  },
});
