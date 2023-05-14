import { mantineColors } from '@src/util/mantineColors';
import { MantineThemeOverride } from '@mantine/core';

export const mantineTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  colors: mantineColors,
  primaryColor: 'maitreya',
  headings: {
    fontFamily: 'Arounder, sans-serif',
    fontWeight: 'bold',
  },
};
