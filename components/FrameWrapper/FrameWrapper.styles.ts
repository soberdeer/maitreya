import { createUseStyles } from 'react-jss';

type Props = {
  noHeader?: boolean;
  autoWidth?: boolean;
  autoHeight?: boolean;
};

export default createUseStyles({
  root: {
    width: (props: Props) => (props?.autoWidth ? 'auto' : '100%'),
    transition: 'height 200ms ease',
    padding: 30,

    '@media screen and (max-width: 540px)': {
      padding: [30, 15],
      width: ['100%', '!important'],
    },
  },

  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: (props: Props) => {
      if (props.noHeader) {
        return '100vh';
      }
      if (props.autoHeight) {
        return 'auto';
      }
      return 'calc(100vh - 80px)';
    },
  },
});
