import React from 'react';
import {
  Animated,
  AnimatedProps,
} from '@arwes/react';
import Link from 'next/link';
import useStyles from './Logo.styles';

export function Logo({ className, animated, ...rest }: AnimatedProps) {
  const { classes, cx } = useStyles();
// console.log(animated.transitions.entering)
  return (
    <Animated as="h1" className={cx(classes.root, className)} {...rest}>
      <Link href="/" title="Arwes Project" style={{ height: '100%' }}>
        <svg viewBox="0 0 44.35 38.38" xmlns="http://www.w3.org/2000/svg" height={40}>
          <path
            d="M11.96 36.91L1.73 19.2 11.96 1.5H32.4l10.23 17.7L32.4 36.91H11.96z"
            className={classes.background}
          />
          <path
            d="M13.96 11.21h16.15v16.26H13.96V11.21zm16.15 16.26l-8.06-16.26m0 0l-8.09 16.26"
            fill="none"
            stroke="#fc0"
            strokeWidth="1.5"
            className={classes.innerBorder}
          />
          <path
            d="M14 11.21s0 8.09 8.09 8.09 8.06-8.09 8.06-8.09m-8.1 16.26V11.21"
            fill="none"
            stroke="#fc0"
            strokeWidth="1.5"
            className={classes.circle}
          />
          <path
            d="M1.73 19.14L11.99 1.37h20.52l10.26 17.77L32.51 36.9H11.99L1.73 19.14z"
            className={classes.border}
          />
        </svg>
      </Link>
    </Animated>
  );
}
