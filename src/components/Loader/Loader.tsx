import React from 'react';
import { Animated, AnimatedProps } from '@arwes/react';
import useStyles from './Loader.styles';

interface LoaderProps extends AnimatedProps {
  small?: boolean;
}

export function Loader({ className, small, ...rest }: LoaderProps) {
  const { classes, cx } = useStyles();

  return (
    <Animated {...rest}>
      {!small && <div className={cx(classes.circle, classes.circle1)} />}
      <div className={cx(classes.circle, classes.circle2)} />
    </Animated>
  );
}
