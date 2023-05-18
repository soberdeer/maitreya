import { createStyles, MantineColor } from '@mantine/core';

type Props = { color: MantineColor; noShadow?: boolean };

export default createStyles((theme, { color, noShadow }: Props) => ({
  styled: {
    fontFamily: 'Arounder, sans-serif',
  },

  anchor: {
    color: theme.colors[color][color === 'maitreyaSecondary' ? 4 : 3],
    textShadow: noShadow
      ? 'none'
      : `0 0 1px ${theme.colors[color][color === 'maitreyaSecondary' ? 4 : 3]}`,
    transition: 'color 200ms ease, text-shadow 2ms',

    '&:hover': {
      color: theme.colors[color][2],
      textShadow: noShadow ? 'none' : `0 0 1px ${theme.colors[color][2]}`,
    },
  },
}));
