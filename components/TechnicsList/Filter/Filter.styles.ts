import { createUseStyles } from 'react-jss';
import colors from '../../../styles/colors';

export default createUseStyles({
  root: {
    position: 'relative',
  },

  filterButton: {
    width: 20,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdown: {
    backgroundColor: 'rgba(0, 248, 248, 0.07)',
    border: `1px solid ${colors.primary}`,
  },

  item: {
    backgroundColor: 'transparent',
    display: 'flex',
    color: colors.primary,
    transition: 'color 100ms ease, background-color 100ms ease',

    '&:hover': {
      backgroundColor: 'rgba(0, 248, 248, 0.07)',
      color: colors.light.primary,
    },
  },
});
