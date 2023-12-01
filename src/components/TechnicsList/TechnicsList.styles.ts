import { createStyles, getStylesRef } from '@mantine/core';

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
    marginBlockEnd: 0,
    fontSize: '1.2rem',
  },
  tabIcon: {
    marginRight: '0 !important',
  },

  tab: {
    ref: getStylesRef('tab'),
    paddingTop: '1rem',
    paddingBottom: '1rem',
    cursor: 'pointer',
    transition: 'border-bottom 200ms ease, border-right 200ms ease, background-color 200ms ease',
  },

  tabList: {
    '&[aria-orientation="horizontal"]': {
      borderBottom: `2px solid ${theme.fn.rgba(theme.colors.maitreya[5], 0.6)}`,

      [`& .${getStylesRef('tab')}`]: {
        // border: '1px solid transparent',
        '&:hover': {
          borderBottom: `2px solid ${theme.colors.maitreya[3]}`,
          backgroundColor: theme.fn.rgba(theme.colors.maitreya[7], 0.2),
          // borderColor: 'transparent',
        },

        '&[data-active]': {
          backgroundColor: theme.fn.rgba(theme.colors.maitreya[7], 0.2),
          borderBottom: `2px solid ${theme.colors.maitreya[3]}`,
          '&:hover': {
            backgroundColor: theme.fn.rgba(theme.colors.maitreya[7], 0.4),
            borderBottom: `2px solid ${theme.colors.maitreya[3]}`,
          },
        },
      },
    },

    '&[aria-orientation="vertical"]': {
      borderRight: `2px solid ${theme.fn.rgba(theme.colors.maitreya[5], 0.6)}`,

      [`& .${getStylesRef('tab')}`]: {
        // border: '1px solid transparent',
        '&:hover': {
          borderRight: `2px solid ${theme.colors.maitreya[3]}`,
          backgroundColor: theme.fn.rgba(theme.colors.maitreya[7], 0.2),
          // borderColor: 'transparent',
        },

        '&[data-active]': {
          // border: `1px solid #89ffff`,
          backgroundColor: theme.fn.rgba(theme.colors.maitreya[7], 0.2),
          borderRight: `2px solid ${theme.colors.maitreya[3]}`,
          '&:hover': {
            backgroundColor: theme.fn.rgba(theme.colors.maitreya[7], 0.4),
            borderRight: `2px solid ${theme.colors.maitreya[3]}`,
          },
        },
      },
    },
  },
}));
