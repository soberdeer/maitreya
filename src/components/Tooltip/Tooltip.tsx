import React from 'react';
import { Tooltip as MantineTooltip, TooltipProps } from '@mantine/core';
import useStyles from './Tooltip.styles';

export function Tooltip({ children, ...rest }: TooltipProps) {
  const { classes } = useStyles();

  return (
    <MantineTooltip
      {...rest}
      multiline
      transitionProps={{ transition: 'scale-x' }}
      withinPortal
      classNames={classes}
      events={{ hover: true, touch: true, focus: true }}
    >
      {children}
    </MantineTooltip>
  );
}
