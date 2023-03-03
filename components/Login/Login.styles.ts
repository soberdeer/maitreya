import { createUseStyles } from 'react-jss';
import colors from '../../styles/colors';

export default createUseStyles({
  root: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loading: {
    position: 'absolute',
    width: 'calc(100% + 60px)',
    height: 'calc(100% + 60px)',
    top: -30,
    left: -30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 10,
  },

  content: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
    width: '100%',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',

    '& > * + *': {
      marginTop: 20,
    },
  },

  input: {
    padding: 0,
    maxWidth: 0,
    transition: 'all 400ms ease 20ms',
  },

  showInput: {
    padding: [5, 10],
    maxWidth: 500,
  },

  frame: {},

  error: {
    color: colors.error,
    stroke: colors.error,
    fill: colors.error,
  },

  '@media screen and (max-width: 768px)': {
    content: {
      minWidth: 'unset',
    },

    frame: {
      width: '100%',
    },
  },
});
