import React, { SVGProps } from 'react';
import { Tooltip } from '@src/components/Tooltip';
import { Animated, Animator } from '@arwes/react';
import { DefaultType } from '@src/components/icons/default-type';
import { Box } from '@mantine/core';

export function InfoHexagonIcon({ size = 24, color, tooltip, ...others }: DefaultType) {
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
              d="M19.875 6.27c.7.398 1.13 1.143 1.125 1.948v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.269 2.269 0 01-2.184 0l-6.75-4.27A2.225 2.225 0 013 15.502V8.217c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 012.25 0l6.75 3.98h-.033zM12 9h.01"
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
              d="M11 12h1v4h1"
              strokeDasharray={100}
            />
          </svg>
        </Box>
      </Tooltip>
    </Animator>
  );
}
