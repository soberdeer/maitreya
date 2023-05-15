import React from 'react';
import useStyles from './Fire.styles';

export function Fire({ color }: { color: string }) {
  const { classes } = useStyles();

  return (
    <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" width={18} height={18}>
      <defs>
        <mask id="fire_mask">
          <rect x="0" y="0" width="1000" height="1000" fill="white" />
          <rect x="0" y="0" width="1000" height="1000" fill="black" className={classes.mask} />
        </mask>
      </defs>
      <path
        d="M301.4 990c-69.7-136-32.6-213.9 21-287.2 58.8-80.3 73.9-159.9 73.9-159.9s46.2 56.2 27.7 144c81.6-84.9 96.9-220.3 84.6-272.1C692.9 535.3 771.7 796.5 665.5 990c564.7-299.1 140.5-746.6 66.6-797.1 24.6 50.5 29.3 135.7-20.4 177.2C627.4 71.3 419.3 10 419.3 10c24.6 154.1-89.2 322.6-199 448.6-3.9-61.5-7.9-103.8-42.5-162.7C170 407.5 79 498.6 54.3 610.4 20.8 761.9 79.3 872.8 301.4 990z"
        fill={color}
        mask="url(#fire_mask)"
      />
    </svg>
  );
}
