import React, { SVGProps } from 'react';
import { Tooltip } from '@src/components/Tooltip';
import { Box, BoxProps, Center } from '@mantine/core';
import { Animated, Animator } from '@arwes/react';

export interface StandardIconProps extends BoxProps {
  size?: number;
  tooltip?: string;
  color?: string;
}

export function StandardIcon({
  size = 26,
  tooltip,
  color = '#FFD43B',
  style,
  ...others
}: StandardIconProps) {
  return (
    <Animator merge combine manager="stagger" duration={{ enter: 0.4, exit: 0.4, delay: 0.5 }}>
      <Box
        sx={{ width: size, height: size, display: 'flex' }}
        style={{ width: size, ...style }}
        {...others}
      >
        <Center sx={{ height: '100%' }}>
          <Tooltip label={tooltip} disabled={!tooltip}>
            <Box sx={{ width: size, height: size, display: 'flex' }}>
              <svg
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width={size}
                height={size}
                xmlns="http://www.w3.org/2000/svg"
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
                  d="M5,8a7,7 0 1,0 14,0a7,7 0 1,0 -14,0"
                  strokeDasharray={45}
                />
                <Animated<SVGPathElement, SVGProps<SVGPathElement>>
                  as="path"
                  animated={{
                    initialStyle: { strokeDashoffset: 30 },
                    transitions: {
                      entering: { strokeDashoffset: 0 },
                      exiting: { strokeDashoffset: 30 },
                    },
                  }}
                  strokeDasharray={30}
                  d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"
                />
              </svg>
            </Box>
          </Tooltip>
        </Center>
      </Box>
    </Animator>
  );
}
