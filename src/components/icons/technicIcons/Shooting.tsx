import React, { SVGProps } from 'react';
import { Tooltip } from '@src/components/Tooltip';
import { Animated, Animator } from '@arwes/react';
import { IconType } from './icon-type';
import { COLORS_MAP_EN } from './colors-map';

export function Shooting({ size = 26, tooltip, ...others }: IconType) {
  return (
    <Animator merge manager="stagger" duration={{ enter: 0.4, exit: 0.4, delay: 0.5 }}>
      <Tooltip label={tooltip} disabled={!tooltip}>
        <svg
          fill="none"
          stroke={COLORS_MAP_EN.shooting}
          strokeLinecap="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          style={{ minWidth: size }}
          {...others}
          {...others}
        >
          <Animated<SVGPathElement, SVGProps<SVGPathElement>>
            as="path"
            animated={{
              initialStyle: { strokeDashoffset: 60 },
              transitions: {
                entering: { strokeDashoffset: 0 },
                exiting: { strokeDashoffset: 60 },
              },
            }}
            d="M3 12a9 9 0 1018 0 9 9 0 10-18 0M12 3v4M12 21v-3M3 12h4M21 12h-3M12 12v.01"
            strokeDasharray={60}
          />
        </svg>
      </Tooltip>
    </Animator>
  );
}
