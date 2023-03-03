import { createUseStyles } from 'react-jss';
import { defaultPalette } from '../../../util/theme';

type Props = {
  paletteObject: typeof defaultPalette;
  palette: string;
  styled?: boolean;
  as?: string;
};

export default createUseStyles({
  root: {
    cursor: 'default',
    color: (props: Props) => props.paletteObject[props.palette].main,
  },

  hover: {
    cursor: 'pointer',
    transition: 'color 200ms ease',

    '&:hover': {
      color: (props: Props) => props.paletteObject[props.palette].light,
    },
  },

  noShadow: {
    textShadow: 'none',
  },
});
