import { createStyles } from '@mantine/core';

export default createStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },

  sphereWrapper: {
    width: 0,
    height: 15,
    overflow: 'hidden',
    transition: 'width 300ms ease',
  },

  activate: {
    width: 15,
  },

  sphere: {
    width: 15,
    height: 15,
    minWidth: 15,
    borderRadius: '50%',
  },

  text: {
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 5,
  },
});
