import React, { SVGProps } from 'react';
import { Tooltip } from '@src/components/Tooltip';
import { Animated, Animator } from '@arwes/react';
import { DefaultType } from '@src/components/icons/default-type';
import { Box } from '@mantine/core';

export function ChevronDownIcon({
  size = 24,
  color,
  tooltip,
  rotate,
  ...others
}: DefaultType & { rotate?: boolean }) {
  return (
    <Animator merge combine manager="stagger" duration={{ enter: 0.4, exit: 0.4, delay: 0.1 }}>
      <Tooltip label={tooltip} disabled={!tooltip}>
        <Box
          sx={{
            width: size,
            height: size,
            display: 'flex',
            transform: rotate ? 'rotate(180deg)' : 'none',
            transition: 'transform 200ms ease',
          }}
        >
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
              d="M6 9l6 6 6-6"
              strokeDasharray={100}
            />
          </svg>
        </Box>
      </Tooltip>
    </Animator>
  );
}
