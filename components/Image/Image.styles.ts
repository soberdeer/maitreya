import { createUseStyles } from 'react-jss';
import { defaultPalette } from '../../util/theme';

type Props = { palette: typeof defaultPalette };
export default createUseStyles({
  button: {
    margin: 0,
    padding: 0,
    border: 0,
    outline: 0,
    cursor: 'pointer',
    backgroundColor: 'transparent',

    '&:focus': {
      outline: 0,
    },
  },

  fullImage: {
    marginBottom: 20,
    border: (props: Props) =>
      `0.5px solid ${props?.palette ? props.palette.primary.main : defaultPalette.primary.main}`,
  },
});
