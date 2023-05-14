import { Tuple, DefaultMantineColor } from '@mantine/core';

type ExtendedCustomColors = 'maitreya' | 'maitreyaSecondary' | DefaultMantineColor;

// @ts-ignore
export const mantineColors: Record<ExtendedCustomColors, Tuple<string, 10>> = {
  maitreya: [
    '#ccffff',
    '#99ffff',
    '#4dffff',
    '#33ffff',
    '#0ff',
    '#00e6e6',
    '#00cccc',
    '#00b3b3',
    '#009999',
    '#008080',
  ],
  maitreyaSecondary: [
    '#ffede2',
    '#ffdcc4',
    '#ffcaa7',
    '#ffb989',
    '#ffa76c',
    '#e69661',
    '#cc8656',
    '#b3754c',
    '#996441',
    '#805436',
  ],
};
