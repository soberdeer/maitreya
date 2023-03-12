// @ts-nocheck
import React from 'react';
import cx from 'clsx';
import { FrameBox as ArwesFrameBox, FrameBoxProps as ArwesFrameBoxProps } from '@arwes/core';
import useStyles from './FrameBox.styles';
import { AnimatorInstanceSettings } from '@arwes/animation';

export interface FrameBoxProps extends ArwesFrameBoxProps, React.HTMLProps<HTMLDivElement> {
  animator?: AnimatorInstanceSettings;
  linesWidths?: number[];
}

export default function FrameBox({ className, children, ...others }: FrameBoxProps) {
  const classes = useStyles();

  return (
    <ArwesFrameBox className={cx(classes.root, className)} {...others}>
      {children}
    </ArwesFrameBox>
  );
}
