// @ts-nocheck
import React from 'react';
import cx from 'clsx';
import useStyles from './Container.styles';

export interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fluid?: boolean;
}

export default function Container({ className, fluid, size = 'md', ...others }: ContainerProps) {
  const classes = useStyles();
  return (
    <div
      className={cx(
        classes.root,
        [classes[size]],
        {
          [classes.fluid]: fluid,
        },
        className
      )}
      {...others}
    />
  );
}
