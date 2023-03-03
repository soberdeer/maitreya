import React, { useMemo } from 'react';
import AnimatedIcon from '../../AnimatedIcon/AnimatedIcon';

type LevelType = { visible: number[]; color: string };

export const levelMapper = {
  pupil: {
    visible: [1, 0, 0],
    color: '#51CF66',
  },
  adept: {
    visible: [1, 1, 0],
    color: '#FFD43B',
  },
  master: {
    visible: [1, 1, 1],
    color: '#ff0000',
  },
};

export interface LevelsIconProps extends SVGSVGElement {
  level: 'pupil' | 'adept' | 'master';
  size?: number;
  tooltip?: string;
}

export default function LevelIcon({ level, size = 26, tooltip, ...others }: LevelsIconProps) {
  const data: LevelType = useMemo(() => levelMapper[level] || levelMapper.pupil, [level]);

  return (
    <div style={{ width: size }}>
      <AnimatedIcon width={size} tooltip={tooltip}>
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
            viewBox="0 0 344.81 199.5"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            width={size}
            {...others}
          >
            <rect height="156.01" width="88.1" rx="17.2" x="24.26" y="21.75" fill={data.color} />
            {data.visible[1] && (
              <rect height="156.01" width="88.1" rx="17.2" x="128.35" y="21.75" fill={data.color} />
            )}
            {data.visible[2] && (
              <rect height="156.01" width="88.1" rx="17.2" x="232.45" y="21.75" fill={data.color} />
            )}
            <rect
              height="333.81"
              width="188.5"
              fill="none"
              rx="17.2"
              stroke={data.color}
              strokeWidth="11"
              transform="rotate(90 2405.35 445.05)"
              x="1965.8"
              y="2511.09"
            />
          </svg>
        </div>
      </AnimatedIcon>
    </div>
  );
}
