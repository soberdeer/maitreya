import React from 'react';
import useStyles from './Wood.styles';

export function Wood({ color }: { color: string }) {
  const { classes } = useStyles();
  return (
    <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" width={18} height={18}>
      <defs>
        <mask id="wood_mask">
          <rect x="0" y="0" width="1000" height="1000" fill="white" />
          <rect x="0" y="0" width="1000" height="1000" fill="black" className={classes.mask} />
        </mask>
      </defs>
      <path
        style={{ transform: 'translate(-5%, 5%)' }}
        fill={color}
        mask="url(#wood_mask)"
        d="M478.1 504.4s-81.5-65-33.6-190.8c0 0 11.4-78.6 192.2-142.2 0 0 202.2-68.6 353-52.9 0 0 7.5 200.6-53.6 315.1-62 116.1-111.5 155-192.9 167.9 0 0-154.2 24.3-207.7-50.7l177.4-187-234.8 140.6zM403.7 542.9s26.7-58.7-22.3-133.9c0 0-29.3-53.1-147.3-56.1 0 0-136.9-5.1-224.1 35.7 0 0 40.2 135.2 102.4 199.2 63.2 64.9 101.6 80.9 153.5 73.1 0 0 98.1-14.8 113.7-75.6l-148.3-89 172.4 46.6zM492.4 561.5s-231.5 153.6-59.3 322.2l93.2-.6s-164.7-113-28.9-305.9c0 0 9.9-13.8 7.1-18.4 0 .1-1.7-5.4-12.1 2.7z"
      />
    </svg>
  );
}
