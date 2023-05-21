import React, { SVGProps } from 'react';
import { Tooltip } from '@src/components/Tooltip';
import { Animated, Animator } from '@arwes/react';
import { DefaultType } from '@src/components/icons/default-type';
import { Box } from '@mantine/core';

export function ChromeIcon({ size = 24, color, tooltip, ...others }: DefaultType) {
  return (
    <Animator merge combine manager="stagger" duration={{ enter: 0.4, exit: 0.4, delay: 0.1 }}>
      <Tooltip label={tooltip} disabled={!tooltip}>
        <Box sx={{ width: size, height: size, display: 'flex' }}>
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
              d="M3 12a9 9 0 1018 0 9 9 0 10-18 0"
              strokeDasharray={100}
            />
            <Animated<SVGPathElement, SVGProps<SVGPathElement>>
              as="path"
              animated={{
                initialStyle: { strokeDashoffset: 45 },
                transitions: {
                  entering: { strokeDashoffset: 0 },
                  exiting: { strokeDashoffset: 45 },
                },
              }}
              d="M9 12a3 3 0 106 0 3 3 0 10-6 0M12 9h8.4M14.598 13.5l-4.2 7.275M9.402 13.5l-4.2-7.275"
              strokeDasharray={45}
            />
          </svg>
        </Box>
      </Tooltip>
    </Animator>
  );
}
