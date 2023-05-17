import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
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

  tabs: {},

  tabText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 5,
    fontFamily: 'Arounder',
  },
  tabIcon: {
    marginRight: '0 !important',
  },

  tabList: {
    borderBottom: `2px solid ${theme.fn.rgba(theme.colors.maitreya[5], 0.6)}`,
  },
  tab: {
    cursor: 'pointer',
    transition: 'border-bottom 200ms ease, background-color 200ms ease',
    // border: '1px solid transparent',
    '&:hover': {
      borderBottom: `2px solid ${theme.colors.maitreya[3]}`,
      backgroundColor: theme.fn.rgba(theme.colors.maitreya[7], 0.2),
      // borderColor: 'transparent',
    },

    '&[data-active]': {
      // border: `1px solid #89ffff`,
      borderBottom: `2px solid ${theme.colors.maitreya[3]}`,
      '&:hover': {
        backgroundColor: 'transparent',
        borderBottom: `2px solid ${theme.colors.maitreya[3]}`,
      },
    },
  },
}));
