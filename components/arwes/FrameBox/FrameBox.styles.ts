import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    '& path[data-type="shape"]': {
      opacity: 0.07,
    },
  },
});
