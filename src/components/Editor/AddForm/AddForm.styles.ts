import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  label: {
    color: theme.colors.maitreya[3],
  },

  input: {
    display: 'block',
    outline: 'none',
    borderWidth: '0px 0px 2px',
    borderStyle: 'solid',
    borderColor: theme.colors.maitreyaSecondary[4],
    padding: '5px 10px',
    width: '100%',
    lineHeight: '30px',
    color: theme.colors.maitreya[3],
    backgroundColor: 'transparent',
    borderRadius: 0,
    transition: 'border-color 200ms ease',

    '&:focus, &:focus-within': {
      borderColor: theme.colors.maitreyaSecondary[4],
      boxShadow: 'none',
    },
  },

  elementWrapper: {
    maxWidth: 40,
  },

  dropdown: {
    backgroundColor: 'rgba(8, 34, 33, 0.9)',
    border: `1px solid ${theme.colors.maitreya[2]}`,
    borderRadius: 0,
    padding: 5,
  },

  item: {
    color: theme.colors.maitreya[3],
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
        color: theme.colors.maitreya[3],
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
}));
