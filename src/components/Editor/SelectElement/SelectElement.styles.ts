import { createUseStyles } from 'react-jss';
import colors from '../../../styles/colors';

export default createUseStyles({
  root: {
    marginTop: 20,
  },

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
    height: 36,

    '&:hover': {
      borderColor: '#ffc69f',
      backgroundColor: 'rgba(210,84,0,0.3)',
      boxShadow: '0 0 2px #d25400',
    },
    '&:focus, &:focus-within': {
      borderColor: colors.secondary,
      boxShadow: 'none',
    },
  },

  elementWrapper: {
    width: 60,
  },

  dropdown: {
    backgroundColor: 'rgba(8, 34, 33, 0.9)',
    border: `1px solid ${colors.light.primary}`,
    borderRadius: 0,
    padding: 5,
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

  text: {
    color: colors.primary,
  },
});
