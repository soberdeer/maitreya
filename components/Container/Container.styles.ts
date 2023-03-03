import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    padding: '0 16px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  xs: {
    maxWidth: 540,
  },

  sm: {
    maxWidth: 720,
  },

  md: {
    maxWidth: 960,
  },

  lg: {
    maxWidth: 1140,
  },

  xl: {
    maxWidth: 1320,
  },

  fluid: {
    maxWidth: 10,
  },
});
