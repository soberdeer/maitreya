import React from 'react';
import { Animated, AnimatedProps } from '@arwes/react';
import useStyles from './MenuItem.styles';

interface MenuItemProps extends AnimatedProps {
  className?: string;
  active?: boolean;
}

export function MenuItem({ className, children, active, ...rest }: MenuItemProps) {
  const { classes, cx } = useStyles();
  return (
    <Animated
      as="li"
      className={cx(classes.root, { [classes.active]: active }, className)}
      {...rest}
    >
      {children}
    </Animated>
  );
}
