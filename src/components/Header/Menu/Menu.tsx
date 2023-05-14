import React from 'react';
import { Animated, AnimatedProps } from '@arwes/react';
import useStyles from './Menu.styles';

interface MenuProps extends AnimatedProps {
  className?: string;
  active?: boolean;
}

export function Menu({ className, children, ...rest }: MenuProps) {
  const { classes, cx } = useStyles();
  return (
    <Animated as="ul" className={cx(classes.root, className)} {...rest}>
      {children}
    </Animated>
  );
}
