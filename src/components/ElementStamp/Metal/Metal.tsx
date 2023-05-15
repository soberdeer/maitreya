import React from 'react';
import { Animated, Animator } from '@arwes/react';
import useStyles from './Metal.styles';

export function Metal({ color }: { color: string }) {
  const { classes } = useStyles();

  return (
    <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" width={18} height={18}>
      <mask id="mask">
        <rect x="0" y="0" width="1000" height="1000" fill="white" />
        <rect x="0" y="0" width="1000" height="1000" fill="black" className={classes.mask} />
        <path
          d="M602.61 397.49l4.79 4.6v196.02l-4.79 4.6-4.6 4.79H401.99l-4.6-4.79-4.79-4.6V402.09l4.79-4.6 4.6-4.79h196.02l4.6 4.79z"
          fill="black"
        />
      </mask>
      <path
        d="M461.64 149.3c-66.36 7.67-132.73 35.29-183.17 76.53-130 106.26-168.21 285-92.83 433.47 34.52 67.7 87.46 120.64 155.17 155.17C470.27 880.25 624.09 860.3 734 763.64c74.22-65.22 118.91-164.38 118.91-263.54 0-99-44.31-197.55-118.34-263-66.57-58.84-151.14-90.68-237.83-89.72-11.32.19-27.24.96-35.1 1.92z"
        fill={color}
        mask="url(#mask)"
      />
      <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
        <Animated
          animated={{
            transitions: {
              enter: {
                strokeDashoffset: [0, 2800],
              },
              exit: {
                strokeDashoffset: [2800, 0],
              },
            },
          }}
          as="path"
          //@ts-ignore
          d="M457.9 61c-103.7 10.71-196.53 54.63-269.39 127.5-69.94 69.93-111.62 155.19-126.27 257.34-2.93 20.32-2.93 88.18 0 108.51 14.64 102.14 56.5 187.4 126.26 257.34q104.64 104.64 257.34 126.25c20.32 2.93 88.19 2.93 108.51 0 84.4-12.06 159.84-44.09 222.2-94.56 88.71-71.66 144.68-172.08 161.4-289 2.92-20.32 2.92-88.19 0-108.51q-21.71-153-126.26-257.34Q709.38 86.19 562.1 63.44C540.4 60.17 480 58.62 457.9 61z"
          fill="none"
          stroke={color}
          strokeWidth={100}
          strokeDasharray={2800}
        />
      </Animator>
    </svg>
  );
}
