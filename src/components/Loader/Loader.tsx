import React from 'react';
import { aaVisibility, Animated, AnimatedProps } from '@arwes/react';
import useStyles from './Loader.styles';

interface LoaderProps extends AnimatedProps {
  small?: boolean;
  full?: boolean;
  smallCircleProps?: React.HTMLProps<HTMLDivElement>;
  largeCircleProps?: React.HTMLProps<HTMLDivElement>;
}

export function Loader({
  className,
  small,
  full,
  smallCircleProps,
  largeCircleProps,
  ...rest
}: LoaderProps) {
  const { classes, cx } = useStyles();

  return (
    <Animated
      className={cx(classes.root, { [classes.small]: small, [classes.full]: full })}
      animated={aaVisibility()}
      {...rest}
    >
      {!small && (
        <div
          {...largeCircleProps}
          className={cx(classes.circle, classes.circle1, largeCircleProps?.className)}
        />
      )}
      <div
        {...largeCircleProps}
        className={cx(classes.circle, classes.circle2, smallCircleProps?.className)}
      />
    </Animated>
  );
}
