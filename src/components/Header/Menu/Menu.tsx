import React from 'react';
import { Animated, AnimatedProps } from '@arwes/react';
import useStyles from './Menu.styles';

interface MenuProps extends AnimatedProps {
  className?: string;
  active?: boolean;
  vertical?: boolean;
}

export function Menu({ className, children, vertical = false, ...rest }: MenuProps) {
  const { classes, cx } = useStyles();
  return (
    <Animated
      as="ul"
      className={cx(classes.root, { [classes.vertical]: vertical }, className)}
      {...rest}
    >
      {children}
    </Animated>
  );
}
