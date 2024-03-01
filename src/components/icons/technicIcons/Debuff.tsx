import React, { SVGProps } from 'react';
import { Tooltip } from '@src/components/Tooltip';
import { Animated, Animator } from '@arwes/react';
import { Box } from '@mantine/core';
import { IconType } from './icon-type';
import { COLORS_MAP_EN } from './colors-map';

export function Debuff({ size = 26, tooltip, ...others }: IconType) {
  return (
    <Animator merge manager="stagger" duration={{ enter: 0.4, exit: 0.4, delay: 0.5 }}>
      <Tooltip label={tooltip} disabled={!tooltip}>
        <Box sx={{ width: size, height: size, display: 'flex' }}>
          <svg
            fill="none"
            stroke={COLORS_MAP_EN.debuff}
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
              d="M12 3c-1.333 1-2 2.5-2 4.5 0 3 2 4.5 2 4.5s2 1.5 2 4.5c0 2-.667 3.5-2 4.5"
              strokeDasharray={60}
            />
            <Animated<SVGPathElement, SVGProps<SVGPathElement>>
              as="path"
              animated={{
                initialStyle: { strokeDashoffset: 60 },
                transitions: {
                  entering: { strokeDashoffset: 0 },
                  exiting: { strokeDashoffset: 60 },
                },
              }}
              d="M19.794 16.5c-.2-1.655-1.165-2.982-2.897-3.982C14.3 11.018 12 12 12 12s-2.299.982-4.897-.518c-1.732-1-2.698-2.327-2.897-3.982"
              strokeDasharray={60}
            />
            <Animated<SVGPathElement, SVGProps<SVGPathElement>>
              as="path"
              animated={{
                initialStyle: { strokeDashoffset: 60 },
                transitions: {
                  entering: { strokeDashoffset: 0 },
                  exiting: { strokeDashoffset: 60 },
                },
              }}
              d="M19.794 7.5c-1.532-.655-3.165-.482-4.897.518C12.3 9.518 12 12 12 12s-.299 2.482-2.897 3.982c-1.732 1-3.365 1.173-4.897.518"
              strokeDasharray={60}
            />
          </svg>
        </Box>
      </Tooltip>
    </Animator>
  );
}
