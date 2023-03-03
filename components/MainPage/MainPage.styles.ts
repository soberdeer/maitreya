import { createUseStyles } from 'react-jss';

export default createUseStyles({
  frameWrapper: {
    '& + &': {
      marginTop: 20,
    },
  },

  dateWrapper: {
    display: 'flex',
    width: '100%',
    marginTop: 40,
    justifyContent: 'flex-end',
  },
});
