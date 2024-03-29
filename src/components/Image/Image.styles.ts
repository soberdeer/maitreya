import { createStyles, getStylesRef, keyframes } from '@mantine/core';

const background = keyframes({
  0: {
    backgroundColor: '#003333',
  },
  '50%': {
    backgroundColor: '#001717',
  },
  '100%': {
    backgroundColor: '#003333',
  },
});

export default createStyles((theme) => ({
  root: {
    // maxHeight: 400,
    overflow: 'hidden',
    // width: '100%',
    transition: 'opacity 400ms ease',
    marginBlockEnd: '2rem',
    marginBlockStart: '2rem',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    margin: [0, 0, 20],
    width: '100%',
    verticalAlign: 'middle',
    marginBlockStart: 0,
    marginBlockEnd: 0,
    marginInlineStart: 0,
    marginInlineEnd: 0,
    overflow: 'hidden',
    transition: 'width 250ms ease, height 250ms ease, opacity 400ms ease',
  },
  holder: {
    ref: getStylesRef('holder'),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 250ms ease-out',
  },
  img: {
    ref: getStylesRef('img'),
    display: 'block',
    border: 'none',
    margin: 0,
    padding: 0,
    maxHeight: 400,
    objectFit: 'contain',
    minHeight: 100,
    minWidth: 200,
    width: '100%',
    height: '100%',
    verticalAlign: 'top',
    // opacity: 0,
    boxShadow: 'none',
    // animation: `${image} 400ms ease forwards`,
    // animationDelay: '300ms',
    // border: `1px solid ${theme.colors.maitreya[5]}`,
    transition:
      'width 250ms ease-in, height 250ms ease-in, min-width 250ms ease-in, min-height 250ms ease-in, border 250ms ease',

    // '&:hover': {
    //   border: `1px solid ${theme.colors.maitreya[3]}`,
    // },
  },
  placeholder: {
    height: 100,
    width: 200,
    backgroundColor: theme.colors.maitreya[9],
    animation: `${background} 4000ms infinite`,
  },
  errorPlaceholder: {
    height: 100,
    width: 200,
    backgroundColor: theme.colors.maitreya[9],
  },
  error: {
    display: 'block',
    margin: 'auto',
    textAlign: 'center',
    color: '#FF3333',
    textShadow: '0 0 2px #FF3333',
  },
  separator: {
    position: 'absolute',
    top: 'auto',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'block',
    width: '100%',
    borderStyle: 'solid',
    borderColor: theme.fn.rgba(theme.colors.maitreya[3], 0.325),
    borderWidth: '0 0 1px',
    transition: 'all 250ms ease-in',
  },
  children: {
    display: 'block',
    margin: 0,
    padding: 10,
    textAlign: 'center',
    backgroundColor: theme.colors.maitreya[9],
    color: theme.colors.maitreya[5],
    transition: 'opacity 250ms ease-in, width 250ms ease, height 250ms ease',
    opacity: 1,
  },

  entering: {},
  entered: {},
  exiting: {},
  exited: {},
}));
