import { createStyles, getStylesRef, px } from '@mantine/core';

const transition = 'width 250ms ease, height 250ms ease';

export default createStyles((theme) => ({
  root: {
    display: 'block',
    position: 'relative',
    padding: '1px',
    transition: `border-color 250ms ease, ${transition}`,
    marginTop: '1rem',
    marginBottom: '1rem',

    '&:hover': {
      [`& .${getStylesRef('border')}`]: {
        borderColor: theme.colors.maitreya[3],
        boxShadow: `0 0 4px ${theme.fn.rgba(theme.colors.maitreya[4], 0.65)}`,
      },
      [`& .${getStylesRef('box')}`]: {
        backgroundColor: theme.fn.rgba(theme.colors.maitreya[4], 0.1),
      },
    },
  },

  box: {
    ref: getStylesRef('box'),
    zIndex: 3,
    position: 'relative',
    overflow: 'hidden',
    display: 'block',
    height: '100%',
    width: '100%',
    padding: [10, 25],
    transition: `background-color 250ms ease-in, ${transition}`,
    backgroundColor: theme.fn.rgba(theme.colors.maitreya[7], 0.1),
  },

  children: {
    display: 'block',
    height: '100%',
    width: '100%',
    paddingLeft: 40,
    paddingTop: 16,
    // paddingBottom: 18,
    marginBlockStart: 0,
    marginBlockEnd: 0,
    marginInlineStart: 0,
    marginInlineEnd: 0,
  },

  borderLeft: {
    ref: getStylesRef('border'),
    zIndex: 1,
    position: 'absolute',
    borderStyle: 'solid',
    transition:
      'border-color 200ms ease-in, box-shadow 250ms ease-in, height 250ms ease-in, width 250ms ease-in',
    borderColor: theme.colors.maitreya[4],
    // boxShadow: `0 0 4px ${theme.fn.rgba(theme.colors.maitreya[6], 0.65)}`,
    opacity: 1,
    left: 0,
    top: '50%',
    transform: 'translate(0, -50%)',
    borderWidth: '0 0 0 5px',
    height: '100%',
  },
}));
