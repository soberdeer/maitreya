import React from 'react';
import cx from 'clsx';
import useStyles from './Tooltip.styles';

export interface TooltipProps extends Omit<React.HTMLProps<HTMLDivElement>, 'content'> {
  content: string;
  direction?: 'top' | 'bottom';
}

export default function Tooltip({
  className,
  content,
  children,
  direction,
  ...others
}: TooltipProps) {
  const classes = useStyles({ direction });

  return (
    <div
      className={cx(
        classes.root,
        {
          [classes.tooltip]: content,
          [classes[direction]]: content && direction,
        },
        className
      )}
      {...others}
      {...(content ? { 'data-tooltip': content } : {})}
    >
      {children}
    </div>
  );
}
