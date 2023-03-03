import { createUseStyles } from 'react-jss';
import colors from '../../styles/colors';

export default createUseStyles({
  root: {
    position: 'fixed',
    bottom: -58,
    display: 'block',
    margin: 0,
    width: '100%',
    zIndex: 1000,
    transition: 'transform 400ms ease',
  },

  activate: {
    transform: 'translateY(-100%)',

    '@media screen and (max-width: 767px)': {
      transform: 'none',
    },
  },

  background: {
    position: 'absolute',
    zIndex: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.8,
  },

  box: {
    box: {
      height: '100%',

      '& > *': {
        height: '100%',
      },
    },
  },

  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },

  link: {
    color: colors.primary,
    transition: 'color 200ms ease',

    '&:hover': {
      color: colors.light.primary,
    },
  },
});
