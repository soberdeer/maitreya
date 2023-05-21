import React, { SVGProps } from 'react';
import { Tooltip } from '@src/components/Tooltip';
import { Animated, Animator } from '@arwes/react';
import { DefaultType } from '@src/components/icons/default-type';
import { Box } from '@mantine/core';

export function ApertureIcon({ size = 24, color, tooltip, ...others }: DefaultType) {
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
              d="M3 12a9 9 0 1018 0 9 9 0 10-18 0M3.6 15h10.55M6.551 4.938l3.26 10.034M17.032 4.636l-8.535 6.201M20.559 14.51l-8.535-6.201M12.257 20.916l3.261-10.034"
              strokeDasharray={100}
            />
          </svg>
        </Box>
      </Tooltip>
    </Animator>
  );
}
