// @ts-nocheck
import React from 'react';
import cx from 'clsx';
import { Figure as ArwesFigure, FigureProps as ArwesFigureProps } from '@arwes/core';
import useStyles from './Figure.styles';

export type FigureProps = ArwesFigureProps & React.HTMLProps<HTMLDivElement>;

export default function Figure({ className, children, ...others }: FigureProps) {
  const classes = useStyles();
  return (
    <ArwesFigure className={cx(classes.root, className)} {...others}>
      {children}
    </ArwesFigure>
  );
}
