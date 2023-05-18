import React, { SVGProps } from 'react';
import { Tooltip } from '@src/components/Tooltip';
import { Animated, Animator } from '@arwes/react';
import { COLORS_MAP_EN } from './colors-map';
import { IconType } from './icon-type';

export function Melee({ size = 26, tooltip, ...others }: IconType) {
  return (
    <Animator merge manager="stagger" duration={{ enter: 0.4, exit: 0.4, delay: 0.5 }}>
      <Tooltip label={tooltip} disabled={!tooltip}>
        <svg
          fill="none"
          stroke={COLORS_MAP_EN.melee}
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
              initialStyle: { strokeDashoffset: 45 },
              transitions: {
                entering: { strokeDashoffset: 0 },
                exiting: { strokeDashoffset: 45 },
              },
            }}
            d="M9 15l6-6M11 6l.463-.536a5 5 0 017.071 7.072L18 13M13 18l-.397.534a5.068 5.068 0 01-7.127 0 4.972 4.972 0 010-7.071L6 11"
            strokeDasharray={45}
          />
        </svg>
      </Tooltip>
    </Animator>
  );
}
