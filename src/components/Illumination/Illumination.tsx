import React from 'react';
import { Illuminator } from '@arwes/react';
import { Box } from '@mantine/core';
import useStyles from './Illumination.styles';

export function Illumination() {
  const { classes } = useStyles();

  return (
    <Box role="presentation" className={classes.root}>
      <Illuminator color="hsl(180 50% 50% / 10%)" size={400} />
    </Box>
  );
}
