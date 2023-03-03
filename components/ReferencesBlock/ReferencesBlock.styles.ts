import { createUseStyles } from 'react-jss';

export default createUseStyles({
  link: {
    '& + &': {
      marginTop: 10,
    },
  },
});
