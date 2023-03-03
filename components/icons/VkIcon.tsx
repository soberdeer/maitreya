import React, { useContext } from 'react';
import AnimatedIcon from '../AnimatedIcon/AnimatedIcon';
import PaletteContext from '../contexts/PaletteContext';

export interface LevelsIconProps extends SVGSVGElement {
  size?: number;
  tooltip?: string;
}

export default function VkIcon({ size = 26, tooltip, ...others }: LevelsIconProps) {
  const { palette } = useContext(PaletteContext);
  return (
    <div style={{ width: size }}>
      {/*<AnimatedIcon width={size} tooltip={tooltip}>*/}
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: size,
          minWidth: size,
        }}
      >
        <svg
          viewBox="0 0 960 960"
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          {...others}
        >
          <path
            d="M812.07 0H147.93A147.93 147.93 0 000 147.93v664.14A147.93 147.93 0 00147.93 960h664.14A147.93 147.93 0 00960 812.07V147.93A147.93 147.93 0 00812.07 0zM777.5 672l-87.74 1.23S670.91 677 646.1 660c-32.81-22.53-63.77-81.1-87.88-73.45-24.46 7.71-23.69 60.45-23.69 60.45s.18 11.25-5.39 17.25c-6.07 6.52-17.93 7.83-17.93 7.83H472s-86.65 5.21-163-74.24c-83.23-86.7-156.72-258.64-156.72-258.64s-4.24-11.27.37-16.73c5.17-6.12 19.26-6.52 19.26-6.52l93.88-.61s8.84 1.47 15.17 6.12c5.22 3.84 8.14 11 8.14 11s15.18 38.37 35.27 73.09c39.22 67.76 57.48 82.58 70.8 75.32 19.4-10.58 13.58-95.79 13.58-95.79s.36-30.93-9.77-44.71c-7.84-10.66-22.62-13.78-29.15-14.65-5.29-.71 3.39-13 14.62-18.47 16.9-8.28 46.73-8.74 82-8.39 27.46.28 35.37 2 46.11 4.59 32.36 7.81 21.38 38 21.38 110.38 0 23.18-4.18 55.79 12.55 66.6 7.19 4.64 24.78.69 68.77-74 20.84-35.41 36.48-77 36.48-77s3.41-7.42 8.72-10.6 12.76-2.25 12.76-2.25L772 316s29.69-3.54 34.49 9.86c5 14.07-11.09 46.9-51.45 100.69-66.27 88.33-73.64 80.07-18.62 131.13 52.56 48.79 63.45 72.53 65.23 75.48C823.4 669.2 777.5 672 777.5 672z"
            fill={palette.text.root}
            fillRule="evenodd"
          />
        </svg>
      </div>
      {/*</AnimatedIcon>*/}
    </div>
  );
}
