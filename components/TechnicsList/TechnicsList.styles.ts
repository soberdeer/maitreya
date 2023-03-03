import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 30,
    alignItems: 'flex-start',
  },

  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    cursor: 'pointer',
    marginBottom: 20,
  },
});
