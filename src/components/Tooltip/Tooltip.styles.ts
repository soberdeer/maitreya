import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.fn.rgba(theme.fn.darken(theme.colors.maitreya[9], 0.7), 0.7),
    color: theme.colors.maitreya[3],
    borderRadius: 0,
    border: '0.5px solid',
    borderImageSlice: 1,
    borderImageSource: `radial-gradient(circle, rgba(0,0,0,0) 90%, ${theme.colors.maitreya[3]} 90%, ${theme.colors.maitreya[3]} 100%)`,
  },
}));
