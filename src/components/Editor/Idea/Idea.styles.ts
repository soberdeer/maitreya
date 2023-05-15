import { createUseStyles } from 'react-jss';
import colors from '../../../styles/colors';

export default createUseStyles({
  deleteButton: {
    display: 'flex',
    alignItems: 'center',
  },

  idea: {
    marginBottom: 0,
  },

  disabled: {
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  strike: {
    position: 'absolute',
    top: 'calc(50% - 1px)',
    left: -5,
    width: 'calc(100% + 10px)',
    height: 2,
    pointerEvents: 'none',
    transition: 'opacity 100ms ease',
    backgroundColor: colors.primary,
  },

  error: {
    fontSize: '1.1rem',
    color: 'red',

    '& *': {
      fontSize: '1.1rem',
      color: 'red',
    },
  },
});
