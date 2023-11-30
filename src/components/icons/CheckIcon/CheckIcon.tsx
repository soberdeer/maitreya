import React, { forwardRef } from 'react';
import { DefaultType } from '@src/components/icons/default-type';

export const CheckIcon = forwardRef<SVGSVGElement, DefaultType>(
  ({ size = 24, color, tooltip, ...others }, ref) => (
    // <Animator merge combine manager="stagger" duration={{ enter: 0.4, exit: 0.4, delay: 0.1 }}>
    //   <Tooltip label={tooltip} disabled={!tooltip}>
    //     <Box sx={{ width: size, height: size, display: 'flex' }}>
    <svg
      fill="none"
      stroke={color || 'currentColor'}
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...others}
      width={size}
      height={size}
      ref={ref}
    >
      <path
        // as="path"
        // animated={{
        //   initialStyle: { strokeDashoffset: 100 },
        //   transitions: {
        //     entering: { strokeDashoffset: 0 },
        //     exiting: { strokeDashoffset: 100 },
        //   },
        // }}
        d="M5 12l5 5L20 7M5 12l5 5L20 7"
        strokeDasharray={100}
      />
    </svg>
    //     </Box>
    //   </Tooltip>
    // </Animator>
  ));
