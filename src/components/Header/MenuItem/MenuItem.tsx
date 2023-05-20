import React from 'react';
import { Animated, AnimatedProps } from '@arwes/react';
import useStyles from './MenuItem.styles';

interface MenuItemProps extends AnimatedProps {
  className?: string;
  active?: boolean;
  as?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
}

export function MenuItem({ className, children, active, as = 'li', ...rest }: MenuItemProps) {
  const { classes, cx } = useStyles();
  return (
    <Animated
      as={as}
      className={cx(classes.root, { [classes.active]: active }, className)}
      {...rest}
    >
      {children}
    </Animated>
  );
}
