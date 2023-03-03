import { createUseStyles } from 'react-jss';
import colors from '../../styles/colors';

type Props = { direction: 'top' | 'bottom' };

export default createUseStyles({
  root: {
    position: 'relative',
  },

  tooltip: {
    position: 'relative',
    cursor: 'pointer',

    '&:before': {
      opacity: 0,
      minWidth: 150,
      userSelect: 'none',
      pointerEvents: 'none',
      bottom: '50%',
      transition: 'opacity 200ms ease, bottom 200ms ease',
      position: 'absolute',
      left: '50%',
      marginBottom: 5,
      transform: 'translateX(-50%)',
      padding: 7,
      borderRadius: 3,
      border: `1px solid ${colors.primary}`,
      backgroundColor: 'rgba(0, 248, 248, 0.1)',
      color: '#fff',
      content: 'attr(data-tooltip)',
      textAlign: 'center',
      fontSize: '14px',
      lineHeight: '1.2',
      wordBreak: 'keep-all',
      hyphens: 'none',
    },

    '&:hover:before': {
      opacity: 1,
      bottom: (props: Props) => (props.direction === 'bottom' ? -50 : '105%'),
    },
  },
});
