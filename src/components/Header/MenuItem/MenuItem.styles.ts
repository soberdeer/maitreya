import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'grid',
    gridAutoFlow: 'column',
    columnGap: '0.5rem',
    justifyContent: 'center',
    alignItems: 'center',

    '& a, & button': {
      display: 'grid',
      gridAutoFlow: 'column',
      columnGap: '0.5rem',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 0.25rem',
      color: theme.colors.maitreya[3],
      cursor: 'pointer',
      opacity: 0.8,
      transitionProperty: 'opacity, transform, outline, border, color, background',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease-out',

      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: 100,
        left: 0,
        right: 0,
        bottom: 0,
        borderTop: `1px solid ${theme.colors.maitreya[3]}`,
        transform: 'scaleX(0)',
        transitionProperty: 'opacity, transform, outline, border, color, background',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease-out',
      },

      '&:hover': {
        color: theme.colors.maitreya[2],
        opacity: 1,
        textShadow: `0 0 2px ${theme.colors.maitreya[2]}`,

        '&:before': {
          transform: 'scaleX(1)',
          textShadow: `0 0 2px ${theme.colors.maitreya[2]}`,
        },
      },

      '&:focus': {
        opacity: 1,
        outline: '1px dotted hsl(180 100% 40% / 50%)',
      },
    },
  },

  active: {
    '& a, & button': {
      color: theme.colors.yellow[3],
      borderBottom: `1px solid ${theme.colors.yellow[3]}`,

      '&:before': {
        bottom: 1,
        borderColor: theme.colors.yellow[3],
      },
      '&:hover': {
        color: theme.colors.yellow[3],
        borderColor: theme.colors.yellow[2],
        textShadow: `0 0 2px ${theme.colors.yellow[2]}`,
        '&:before': {
          color: theme.colors.yellow[3],
          textShadow: `0 0 2px ${theme.colors.yellow[2]}`,
        },
      },
      '&:focus': {
        outline: `1px solid ${theme.fn.rgba(theme.colors.yellow[3], 0.45)} `,
      },
    },
  },
}));
