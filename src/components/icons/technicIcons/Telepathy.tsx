import React, { SVGProps } from 'react';
import { Tooltip } from '@src/components/Tooltip';
import { Animated, Animator } from '@arwes/react';
import { Box } from '@mantine/core';
import { COLORS_MAP_EN } from './colors-map';
import { IconType } from './icon-type';

export function Telepathy({ size = 26, tooltip, ...others }: IconType) {
  return (
    <Animator merge manager="stagger" duration={{ enter: 0.4, exit: 0.4, delay: 0.5 }}>
      <Tooltip label={tooltip} disabled={!tooltip}>
        <Box sx={{ width: size, height: size, display: 'flex' }}>
          <svg
            fill="none"
            stroke={COLORS_MAP_EN.telepathy}
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
              d="M4 19a1 1 0 102 0 1 1 0 10-2 0M4 4a16 16 0 0116 16M4 11a9 9 0 019 9"
              strokeDasharray={45}
            />
          </svg>
        </Box>
      </Tooltip>
    </Animator>
  );
}
