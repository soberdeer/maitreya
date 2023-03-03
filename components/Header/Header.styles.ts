import { createUseStyles } from 'react-jss';
import colors from '../../styles/colors';

export default createUseStyles({
  root: {
    position: 'fixed',
    top: -60,
    display: 'block',
    margin: [0, 'auto', 10],
    width: '100%',
    zIndex: 1000,
    transition: 'transform 400ms ease',
  },

  activate: {
    transform: 'translateY(100%)',
  },

  background: {
    position: 'absolute',
    zIndex: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.7,
  },

  svg: {
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  path: {
    opacity: 1,
  },

  box: {
    height: '100%',

    '& > *': {
      height: '100%',
    },
  },

  link: {
    fontSize: 22,
    fontFamily: '"Arounder", sans-serif',
    letterSpacing: ['.03em', '!important'],
    display: 'flex',
    alignItems: 'center',
    '& *': {
      letterSpacing: ['.03em', '!important'],
    },
  },

  logoText: {
    display: 'none',
  },

  content: {
    position: 'relative',
    zIndex: 10,
    height: '100%',
    display: 'none',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // flexDirection: 'column',
    margin: [0, 'auto'],
    gap: 30,
    // padding: [20, 20, 10],
    width: '100%',
    maxWidth: 1000,
  },
  brand: {
    margin: [0, 'auto', 10],
    width: '100%',
    maxWidth: 300,
  },
  menu: {
    width: '100%',
  },

  mobileContent: {
    display: 'flex',
  },

  burgerButton: {
    backgroundColor: 'transparent',
    border: 'none',
    margin: 0,
    padding: 0,
    cursor: 'pointer',
  },

  modalContent: {
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
  },

  header: {
    height: 40,
    width: '100%',
  },

  anchor: {
    fontSize: 24,
  },

  logout: {
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    color: colors.secondary,
    cursor: 'pointer',
  },

  logo: {},

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
  },

  '@keyframes slideRight': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },

  '@media screen and (min-width: 768px)': {
    root: {
      marginBottom: 20,
    },
    content: {
      display: 'flex',
      alignItems: 'center',
    },

    logoText: {
      display: 'block',
    },
    mobileContent: {
      display: 'none',
    },
    brand: {
      margin: 0,
    },
    menu: {
      margin: 0,
      maxWidth: 375,
    },
  },

  '@media screen and (min-width: 1025px)': {
    menu: {
      margin: 0,
      width: 420,
      maxWidth: 'none',
    },
  },
});
