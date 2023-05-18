import React, { SVGProps } from 'react';
import { Tooltip } from '@src/components/Tooltip';
import { Animated, Animator } from '@arwes/react';
import { IconType } from './icon-type';
import { COLORS_MAP_EN } from './colors-map';

export function Recovery({ size = 26, tooltip, ...others }: IconType) {
  return (
    <Animator merge manager="stagger" duration={{ enter: 0.4, exit: 0.4 }}>
      <Tooltip label={tooltip} disabled={!tooltip}>
        <svg
          fill="none"
          stroke={COLORS_MAP_EN.recovery}
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
            d="M3 12a9 9 0 1018 0 9 9 0 10-18 0M9 12h6M12 9v6"
            strokeDasharray={60}
          />
        </svg>
      </Tooltip>
    </Animator>
  );
}
