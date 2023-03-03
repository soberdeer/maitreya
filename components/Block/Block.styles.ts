import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    margin: 'auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  content: {
    width: '100%',
  },

  link: {
    '& + &': {
      paddingTop: 20,
    },
  },
});
