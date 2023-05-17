import { createStyles } from '@mantine/core';

export default createStyles(() => ({
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
  },

  key: {
    fontSize: 22,
    fontFamily: 'Arounder, sans-serif',
  },

  title: {
    alignItems: 'flex-start',

    '& > div': {},
  },

  description: {
    paddingTop: 30,
  },

  videoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },

  text: {
    fontFamily: 'Arounder, sans-serif',
  },
}));
