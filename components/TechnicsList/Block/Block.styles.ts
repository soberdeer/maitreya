import { createUseStyles } from 'react-jss';

export default createUseStyles({
  block: {
    '& + &': {
      marginTop: 30,
    },
  },

  technicLinks: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'flex-start',
  },

  flex: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    marginBottom: 30,

    '& *': {
      cursor: ['pointer', '!important'],
    },
  },

  chevron: {
    transition: 'transform 100ms ease',
  },

  rotate: {
    transform: 'rotate(180deg)',
  },
});
