import React, { SVGProps } from 'react';
import { Tooltip } from '@src/components/Tooltip';
import { Animated, Animator } from '@arwes/react';
import { DefaultType } from '@src/components/icons/default-type';

export function AnalyzeIcon({ size = 24, color, tooltip, ...others }: DefaultType) {
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
            d="M20 11a8.1 8.1 0 00-6.986-6.918A8.095 8.095 0 004.995 8M4 13a8.1 8.1 0 0015 3"
            strokeDasharray={100}
          />
          <Animated<SVGPathElement, SVGProps<SVGPathElement>>
            as="path"
            animated={{
              initialStyle: { strokeDashoffset: 100 },
              transitions: {
                entering: { strokeDashoffset: 0 },
                exiting: { strokeDashoffset: 100 },
              },
            }}
            d="M18 16a1 1 0 102 0 1 1 0 10-2 0M4 8a1 1 0 102 0 1 1 0 10-2 0M9 12a3 3 0 106 0 3 3 0 10-6 0"
            strokeDasharray={100}
          />
        </svg>
      </Tooltip>
    </Animator>
  );
}
