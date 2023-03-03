import { createUseStyles } from 'react-jss';

type Props = { longName: boolean };

export default createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 30,
    gap: 20,

    '@media screen and (max-width: 720px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  flex: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
  },

  text: {
    display: 'flex',
    wordBreak: 'break-word',
    hyphens: 'auto',
  },

  name: {
    fontSize: (props: Props) => (props.longName ? 28 : 45),

    '@media screen and (max-width: 720px)': {
      fontSize: [28, '!important'],
      wordBreak: 'break-word',
      hyphens: 'auto',
    },
  },
});
