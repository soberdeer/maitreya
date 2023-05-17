import React, { SVGProps } from 'react';
import { aaVisibility, Animated } from '@arwes/react';
import { Box } from '@mantine/core';
import useStyles from './Ring.styles';

export function Ring({ size = 100, avatar }: { size: number; avatar?: string }) {
  const { classes } = useStyles();

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      {avatar && (
        <div className={classes.avatarWrapper}>
          <Box sx={{ width: size / 2.9, height: size / 2.9 }} className={classes.avatar}>
            <Animated animated={aaVisibility()}>
              <img src={avatar} alt="avatar" width={size / 2.9} style={{ minWidth: size / 2.9 }} />
            </Animated>
          </Box>
        </div>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1000 1000"
        width={size}
        height={size}
      >
        <Animated<SVGPathElement, SVGProps<SVGPathElement>>
          as="path"
          animated={{
            initialStyle: { strokeDashoffset: 2000 },
            transitions: {
              entering: { strokeDashoffset: 0 },
              exiting: { strokeDashoffset: 2000 },
            },
          }}
          d="M197.2,500a302.8,302.8 0 1,0 605.6,0a302.8,302.8 0 1,0 -605.6,0"
          strokeDasharray={2000}
          className={classes.st0}
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 500 500"
            to="360 500 500"
            dur="100s"
            repeatCount="indefinite"
          />
        </Animated>
        <Animated<SVGPathElement, SVGProps<SVGPathElement>>
          as="path"
          animated={{
            initialStyle: { strokeDashoffset: 2500 },
            transitions: {
              entering: { strokeDashoffset: 0 },
              exiting: { strokeDashoffset: 2500 },
            },
          }}
          d="M133.2,500a366.8,366.8 0 1,0 733.6,0a366.8,366.8 0 1,0 -733.6,0"
          strokeDasharray={2500}
          className={classes.st2}
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 500 500"
            to="-360 500 500"
            dur="50s"
            repeatCount="indefinite"
          />
        </Animated>
        <Animated<SVGPathElement, SVGProps<SVGPathElement>>
          as="path"
          animated={{
            initialStyle: { strokeDashoffset: 2500 },
            transitions: {
              entering: { strokeDashoffset: 0 },
              exiting: { strokeDashoffset: 2500 },
            },
          }}
          d="M114.89999999999998,500a385.1,385.1 0 1,0 770.2,0a385.1,385.1 0 1,0 -770.2,0"
          strokeDasharray={2500}
          className={classes.st3}
        />
      </svg>
    </div>
  );
}
