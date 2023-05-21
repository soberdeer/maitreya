import React, { SVGProps } from 'react';
import { Animated, Animator } from '@arwes/react';
import { Box, useMantineTheme } from '@mantine/core';
import { DefaultType } from '@src/components/icons/default-type';

export function LogoutIcon({ size, color, ...rest }: DefaultType) {
  const theme = useMantineTheme();
  return (
    <Box sx={{ width: size, height: size, display: 'flex' }}>
      <svg
        fill="none"
        strokeLinecap="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <Animator manager="stagger" combine merge>
          <Animated<SVGPathElement, SVGProps<SVGPathElement>>
            as="path"
            stroke={color || theme.colors.maitreyaSecondary[4]}
            d="M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2"
            animated={{
              initialStyle: { strokeDashoffset: 50 },
              transitions: {
                entering: { strokeDashoffset: 0 },
                exiting: { strokeDashoffset: 50 },
              },
            }}
            strokeDasharray={50}
            style={{ transition: 'stroke-dashoffset 0.4s ease' }}
          />
          <Animated<SVGPathElement, SVGProps<SVGPathElement>>
            as="path"
            d="M9 12h12l-3-3M18 15l3-3"
            animated={{
              initialStyle: { strokeDashoffset: 20 },
              transitions: {
                entering: { strokeDashoffset: 0 },
                exiting: { strokeDashoffset: 20 },
              },
            }}
            strokeDasharray={20}
            stroke={color || theme.colors.maitreyaSecondary[4]}
            style={{ transition: 'stroke-dashoffset 0.4s ease' }}
          />
        </Animator>
      </svg>
    </Box>
  );
}
