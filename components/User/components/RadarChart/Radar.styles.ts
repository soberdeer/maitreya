import { createUseStyles } from 'react-jss';
import colors from '../../../../styles/colors';

export default createUseStyles({
  root: {
    width: 300,
    height: 300,
  },
  radar: {
    color: colors.primary,
    '& text': {
      color: colors.primary,
    },
  },

  radarContainer: {
    height: 0,
    transition:
      'width 300ms ease, height 300ms ease, opacity 300ms ease, border-radius 300ms ease, transform 300ms ease',
    opacity: 0,
    overflow: 'hidden',
    transformOrigin: 'top left',
    borderRadius: '50%',
    width: 0,
  },

  active: {
    opacity: 1,
    width: 300,
    height: 300,
    borderRadius: 0,
  },
  tooltip: {
    backgroundColor: 'rgba(0, 248, 248, 0.1)',
    border: `1px solid ${colors.primary}`,
  },
});
