import React from 'react';
import useStyles from './Earth.styles';

export function Earth({ color }: { color: string }) {
  const { classes } = useStyles();
  return (
    <svg viewBox="0 0 1000 1000" width={18} height={18}>
      <defs>
        <mask id="earth_mask">
          <rect x="0" y="0" width="1000" height="1000" fill="white" />
          <rect x="0" y="0" width="1000" height="1000" fill="black" className={classes.mask} />
        </mask>
      </defs>
      <path
        d="M500.9 99.1L256.2 583l-81.6-80.6S-10.8 900.9 11.8 900.9l978.1-.1-205.3-440-60.4 38L500.9 99.1zM353.1 499.4L503.9 205l140.5 252.9-60.6 41.5-82.4-79.8-148.3 79.8z"
        fill={color}
        mask="url(#earth_mask)"
        style={{ transform: 'translateY(-10%)' }}
      />
    </svg>
  );
}
