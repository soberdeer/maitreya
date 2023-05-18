import { createStyles, getStylesRef, MantineColor } from '@mantine/core';

type Props = {
  color: MantineColor;
};

export default createStyles((theme, { color }: Props) => ({
  button: {
    position: 'relative',

    '& path[data-name="shape"]': {
      transition: 'color 200ms ease',
      color: theme.fn.rgba(theme.fn.darken(theme.colors[color][9], 0.5), 0.2),
      // filter: 'drop-shadow(0 0 4px rgba(45, 45, 6, 0.4))',
    },
    '& path[data-name="decoration"]': {
      transition: 'color 200ms ease',
      color: theme.colors[color][color === 'maitreya' ? 3 : 5],
      // filter: `drop-shadow(0 0 4px ${theme.colors.yellow[5]})`,
    },

    '&:hover': {
      '& path[data-name="shape"]': {
        color: theme.fn.rgba(theme.colors[color][7], 0.2),
        // filter: 'drop-shadow(0 0 4px rgba(45, 45, 6, 0.4))',
      },
      '& path[data-name="decoration"]': {
        color: theme.colors[color][2],
        // filter: `drop-shadow(0 0 4px ${theme.colors.yellow[5]})`,
      },
      [`& .${getStylesRef('text')}`]: {
        color: theme.colors[color][2],
        '& *': {
          color: theme.colors[color][2],
        },
      },
    },
  },

  box: {
    pointerEvents: 'none',
  },

  group: {
    padding: [10, 25],
  },

  text: {
    ref: getStylesRef('text'),
    transition: 'color 200ms ease',
    color: theme.colors[color][color === 'maitreya' ? 3 : 5],

    '& *': {
      transition: 'color 200ms ease',
      color: theme.colors[color][color === 'maitreya' ? 3 : 5],
    },
  },
}));
