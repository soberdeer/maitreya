import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  root: {
    width: '100%',
    overflowX: 'hidden',
    textAlign: 'left',

    '& ul, & ol': {
      // verticalAlign: 'text-top !important',
      // '& li': {
      //   verticalAlign: 'text-top !important',
      //   position: 'relative',
      //   // display: 'inline-block',
      //   '&::marker': {
      //     height: '100% !important',
      //   },
      // },

      '& ul, & ol': {
        marginBlockStart: '1rem',
        marginBlockEnd: 0,
      },
      '& p': {
        marginBlockEnd: 0,
      },
    },
  },
}));
