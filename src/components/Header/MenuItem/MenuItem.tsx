import React from 'react';
import { Animated, AnimatedProps } from '@arwes/react';
import { Tooltip } from '@src/components/Tooltip';
import useStyles from './MenuItem.styles';

interface MenuItemProps extends AnimatedProps {
  className?: string;
  active?: boolean;
  as?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
  tooltip?: string;
}

export function MenuItem({
  className,
  children,
  active,
  as = 'li',
  tooltip,
  ...rest
}: MenuItemProps) {
  const { classes, cx } = useStyles();
  return (
    <Animated
      as={as}
      className={cx(classes.root, { [classes.active]: active }, className)}
      {...rest}
    >
      <Tooltip label={tooltip} disabled={!tooltip}>
        {children}
      </Tooltip>
    </Animated>
  );
}
