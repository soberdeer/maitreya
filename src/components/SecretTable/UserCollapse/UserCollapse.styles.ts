import { createStyles } from '@mantine/core';

export default createStyles({
  chevron: {
    transition: 'transform 200ms ease',
  },

  rotate: {
    transform: 'rotate(180deg)',
  },

  userName: {
    marginBlockEnd: 0,
    marginBlockStart: 0,
  },

  table: {
    '& th': {
      width: '50%',
    },
  },
});
