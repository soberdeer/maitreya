import { createUseStyles } from 'react-jss';
import colors from '../../../styles/colors';

type Props = { palette: string };

export default createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    gap: 10,
  },

  hover: {
    '&:hover': {
      '& $icon': {
        color: (props: Props) => colors.light[props.palette],
      },
      '& $text': {
        color: (props: Props) => colors.light[props.palette],
      },
    },
  },

  right: {
    flexDirection: 'row-reverse',
  },

  text: {
    marginBottom: 0,
    transition: 'color: 200ms ease',
    color: (props: Props) => colors[props.palette],
    cursor: 'inherit',
  },

  icon: {
    transition: 'color: 200ms ease',
    color: (props: Props) => colors[props.palette],
  },
});
