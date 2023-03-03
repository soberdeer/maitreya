import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {},
  asset: {
    '& picture': {
      backgroundColor: 'transparent',
    },
  },

  imageWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tableWrapper: {
    width: '100%',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },

  table: {
    // minWidth: 850,
    '& .arwes-table__cell': {
      hyphens: 'auto',

      '@media screen and (max-width: 540px)': {
        minWidth: 150,
      },
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },

  listItem: {
    '&::marker': {
      content: '""',
      display: 'none',
    },
  },

  listItemContent: {
    alignItems: 'flex-start',
    marginBottom: 0,
  },
});
