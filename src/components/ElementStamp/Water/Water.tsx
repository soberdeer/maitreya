import React from 'react';
import useStyles from './Water.styles';

export function Water({ color }: { color: string }) {
  const { classes } = useStyles();
  return (
    <svg viewBox="0 0 733.2 980" xmlns="http://www.w3.org/2000/svg" width={18} height={18}>
      <defs>
        <mask id="water_mask">
          <rect x="0" y="0" width="1000" height="1000" fill="white" />
          <rect x="0" y="0" width="1000" height="1000" fill="black" className={classes.mask} />
        </mask>
      </defs>
      <path
        d="M772.6 377.6L499.8 10 227.4 377.6c-58.1 65.1-93.9 150.8-93.9 244.8 0 203.2 164.4 367.6 366.4 367.6 202.7 0 366.8-164.4 366.8-367.6a365.44 365.44 0 00-94.1-244.8zM537.7 890.7c-16.5-30.9-43.7-66.3-43.7-66.3s109.6-41.2 134.4-118.3l80.8 45.7c-.1 0-41.3 112.1-171.5 138.9zm175.5-209a56.23 56.23 0 01-56.4-56.5c0-31.3 25.1-56.9 56.4-56.9s56.5 25.6 56.5 56.9a56.25 56.25 0 01-56.5 56.5z"
        fill={color}
        transform="translate(-133.5 -10)"
        mask="url(#water_mask)"
      />
    </svg>
  );
}
