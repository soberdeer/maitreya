import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    margin: 'auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },

  content: {
    width: '100%',
  },

  link: {
    '& + &': {
      paddingTop: 50,
    },
  },
});
