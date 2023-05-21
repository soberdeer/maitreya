import React, { SVGProps } from 'react';
import { Animated, Animator } from '@arwes/react';
import { DefaultType } from '@src/components/icons/default-type';
import useStyles from './CoffeeIcon.styles';

export function CoffeeIcon({ size = 26, color = '#FFD43B' }: DefaultType) {
  const { classes, cx } = useStyles();

  return (
    <Animator merge manager="stagger" duration={{ enter: 0.4, exit: 0.4, delay: 0.5 }}>
      <svg
        fill="none"
        stroke={color || 'currentColor'}
        strokeLinecap="round"
        strokeWidth="1.5"
        viewBox="0 0 44 44"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        className={classes.coffeeCup}
      >
        <Animated<SVGPathElement, SVGProps<SVGPathElement>>
          as="path"
          className={cx(classes.steam, classes.steam1)}
          animated={{
            initialStyle: { strokeDashoffset: 15 },
            transitions: {
              entering: { strokeDashoffset: 0 },
              exiting: { strokeDashoffset: 15 },
            },
          }}
          strokeDasharray={15}
          d="M18.9,5.5a4.41,4.41,0,0,0-1.84,3.67,4.38,4.38,0,0,0,1.84,3.66"
        />
        <Animated<SVGPathElement, SVGProps<SVGPathElement>>
          as="path"
          className={cx(classes.steam, classes.steam2)}
          animated={{
            initialStyle: { strokeDashoffset: 30 },
            transitions: {
              entering: { strokeDashoffset: 0 },
              exiting: { strokeDashoffset: 30 },
            },
          }}
          strokeDasharray={30}
          d="M11.56,5.5A4.4,4.4,0,0,0,9.73,9.17a4.37,4.37,0,0,0,1.83,3.66"
        />
        <Animated<SVGPathElement, SVGProps<SVGPathElement>>
          as="path"
          className={cx(classes.steam, classes.steam3)}
          animated={{
            initialStyle: { strokeDashoffset: 50 },
            transitions: {
              entering: { strokeDashoffset: 0 },
              exiting: { strokeDashoffset: 50 },
            },
          }}
          strokeDasharray={50}
          d="M26.36 5.5a4.43 4.43 0 00-1.83 3.67 4.4 4.4 0 001.83 3.66"
        />
        <Animated<SVGPathElement, SVGProps<SVGPathElement>>
          as="path"
          className={classes.cup}
          animated={{
            initialStyle: { strokeDashoffset: 85 },
            transitions: {
              entering: { strokeDashoffset: 0 },
              exiting: { strokeDashoffset: 85 },
            },
          }}
          strokeDasharray={85}
          d="M5.5 18.33h25.67v9.17a11 11 0 01-11 11H16.5a11 11 0 01-11-11zM30.7 30.66a5.5 5.5 0 10.46-10.18"
        />
        <Animated<SVGPathElement, SVGProps<SVGPathElement>>
          as="path"
          className={classes.cup}
          animated={{
            initialStyle: { strokeDashoffset: 30 },
            transitions: {
              entering: { strokeDashoffset: 0 },
              exiting: { strokeDashoffset: 30 },
            },
          }}
          strokeDasharray={30}
          d="M30.7,30.66a5.5,5.5,0,1,0,.46-10.18"
        />
        <Animated<SVGPathElement, SVGProps<SVGPathElement>>
          as="path"
          className={classes.coffee}
          animated={{
            initialStyle: { strokeDashoffset: 45 },
            transitions: {
              entering: { strokeDashoffset: 0 },
              exiting: { strokeDashoffset: 45 },
            },
          }}
          strokeDasharray={45}
          d="M5.5,25.67a10.43,10.43,0,0,0,6.42,1.83,10.4,10.4,0,0,0,6.41-1.83,10.39,10.39,0,0,1,6.42-1.84,10.37,10.37,0,0,1,6.42,1.84"
        />
      </svg>
    </Animator>
  );
}
