import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 320px)',

    '@media screen and (max-width: 720px)': {
      paddingTop: 40,
      width: '100%',
    },
  },

  group: {
    '& + &': {
      marginTop: 20,
    },
  },
});
