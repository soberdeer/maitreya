import React from 'react';
import cx from 'clsx';
import { useActivate } from '../../hooks/use-activate';
import Tooltip from '../Tooltip/Tooltip';
import useStyles from './AnimatedIcon.styles';

export interface AnimatedIconProps extends React.HTMLProps<HTMLDivElement> {
  timeout?: number;
  tooltip?: string;
  direction?: 'top' | 'bottom';
}

export default function AnimatedIcon({
  width,
  height,
  className,
  children,
  timeout,
  tooltip,
  ...others
}: AnimatedIconProps) {
  const classes = useStyles({ width, height });
  const { activate } = useActivate(true, timeout);

  return (
    <Tooltip className={cx(classes.root, className)} {...others} content={tooltip}>
      <div className={cx(classes.wrapper, { [classes.activate]: activate })}>{children}</div>
    </Tooltip>
  );
}
