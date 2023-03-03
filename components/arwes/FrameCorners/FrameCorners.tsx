// @ts-nocheck
import React from 'react';
import cx from 'clsx';
import {
  FrameCorners as ArwesFrameCorners,
  FrameCornersProps as ArwesFrameCornersProps,
} from '@arwes/core';
import useStyles from './FrameCorners.styles';

export default function FrameCorners({
  className,
  children,
  ...others
}: ArwesFrameCornersProps & React.HTMLProps<HTMLDivElement>) {
  const classes = useStyles();
  return (
    <ArwesFrameCorners className={cx(classes.root, className)} {...others}>
      {children}
    </ArwesFrameCorners>
  );
}
