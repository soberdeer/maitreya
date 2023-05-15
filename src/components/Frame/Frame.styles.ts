import { createStyles, getStylesRef } from '@mantine/core';

const transition = 'width 250ms ease, height 250ms ease';

export default createStyles((theme) => ({
  root: {
    display: 'block',
    position: 'relative',
    padding: '1px',
    transition: `border-color 250ms ease, ${transition}`,

    '&:hover': {
      [`& .${getStylesRef('border')}`]: {
        borderColor: theme.colors.maitreya[4],
        boxShadow: `0 0 4px ${theme.fn.rgba(theme.colors.maitreya[4], 0.65)}`,
      },
    },
  },

  box: {
    zIndex: 3,
    position: 'relative',
    overflow: 'hidden',
    display: 'block',
    height: '100%',
    width: '100%',
    transition: `background-color 250ms ease-in, ${transition}`,
    backgroundColor: theme.fn.rgba(theme.colors.maitreya[9], 0.4),
  },

  children: {
    display: 'block',
    height: '100%',
    width: '100%',
  },

  border: {
    ref: getStylesRef('border'),
    zIndex: 1,
    position: 'absolute',
    borderStyle: 'solid',
    transition:
      'border-color 200ms ease-in, box-shadow 250ms ease-in, height 250ms ease-in, width 250ms ease-in',
    borderColor: theme.colors.maitreya[6],
    boxShadow: `0 0 4px ${theme.fn.rgba(theme.colors.maitreya[6], 0.65)}`,
    opacity: 1,
  },

  borderLeft: {
    left: 0,
    top: '50%',
    transform: 'translate(0, -50%)',
    borderWidth: '0 0 0 1px',
    height: '100%',
  },

  borderRight: {
    right: 0,
    top: '50%',
    transform: 'translate(0, -50%)',
    borderWidth: '0 0 0 1px',
    height: '100%',
  },

  borderTop: {
    top: 0,
    left: '50%',
    transform: 'translate(-50%, 0)',
    borderWidth: '1px 0 0 0',
    width: '100%',
  },

  borderBottom: {
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 0)',
    borderWidth: '1px 0 0 0',
    width: '100%',
  },
}));
