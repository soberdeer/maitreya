import { createUseStyles } from 'react-jss';
import colors from '../../../styles/colors';

export default createUseStyles({
  label: {
    color: colors.primary,
  },

  input: {
    display: 'block',
    outline: 'none',
    borderWidth: '0px 0px 2px',
    borderStyle: 'solid',
    borderColor: colors.secondary,
    padding: '5px 10px',
    width: '100%',
    lineHeight: '30px',
    color: colors.primary,
    backgroundColor: 'transparent',
    borderRadius: 0,

    '&:focus, &:focus-within': {
      borderColor: colors.secondary,
      boxShadow: 'none',
    },
  },

  elementWrapper: {
    maxWidth: 40,
  },

  dropdown: {
    backgroundColor: 'rgba(8, 34, 33, 0.9)',
    border: `1px solid ${colors.light.primary}`,
    borderRadius: 0,
  },

  item: {
    color: colors.primary,
    backgroundColor: 'transparent',
    borderRadius: 0,
    transition: 'background-color 200ms ease',

    '&:hover': {
      backgroundColor: 'rgba(210,84,0,0.3)',
    },

    '&:focus, &:focus-within': {
      backgroundColor: 'rgba(210,84,0,0.3)',
    },
    '&[data-selected]': {
      '&, &:hover': {
        backgroundColor: 'rgba(210,84,0,0.5)',
        color: colors.primary,
      },
    },
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
