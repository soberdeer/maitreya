import React, { SVGProps } from 'react';
import { Tooltip } from '@src/components/Tooltip';
import { Animated, Animator } from '@arwes/react';
import { DefaultType } from '@src/components/icons/default-type';

export function MenuIcon({ size = 24, color, tooltip, ...others }: DefaultType) {
  return (
    <Animator merge combine manager="stagger" duration={{ enter: 0.4, exit: 0.4, delay: 0.1 }}>
      <Tooltip label={tooltip} disabled={!tooltip}>
        <svg
          fill="none"
          stroke={color || 'currentColor'}
          strokeLinecap="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          {...others}
        >
          <Animated<SVGPathElement, SVGProps<SVGPathElement>>
            as="path"
            animated={{
              initialStyle: { strokeDashoffset: 100 },
              transitions: {
                entering: { strokeDashoffset: 0 },
                exiting: { strokeDashoffset: 100 },
              },
            }}
            d="M4 6h16M4 12h16M4 18h16"
            strokeDasharray={100}
          />
        </svg>
      </Tooltip>
    </Animator>
  );
}
