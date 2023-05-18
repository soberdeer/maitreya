import React, { SVGProps, useMemo } from 'react';
import { Tooltip } from '@src/components/Tooltip';
import { Animated, Animator } from '@arwes/react';

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

export interface LevelsIconProps {
  level: 'pupil' | 'adept' | 'master';
  size?: number;
  tooltip?: string;
}

export function LevelIcon({ level, size = 26, tooltip, ...others }: LevelsIconProps) {
  const data: LevelType = useMemo(() => levelMapper[level] || levelMapper.pupil, [level]);

  return (
    <Animator merge combine manager="stagger" duration={{ enter: 0.4, exit: 0.4, delay: 0.1 }}>
      <Tooltip label={tooltip} disabled={!tooltip}>
        <svg viewBox="0 0 344.81 199.5" xmlns="http://www.w3.org/2000/svg" width={size} {...others}>
          <Animated<SVGRectElement, SVGProps<SVGRectElement>>
            as="rect"
            fill={data.color}
            d="M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2"
            animated={{
              initialStyle: { height: 0 },
              transitions: {
                entering: { height: 156.01 },
                exiting: { height: 0 },
              },
            }}
            width={88.1}
            rx={17.2}
            x={24.26}
            y={21.75}
            style={{ transition: 'height 0.4s ease' }}
          />
          {data.visible[1] && (
            <Animator merge combine duration={{ offset: 0.1 }}>
              <Animated<SVGRectElement, SVGProps<SVGRectElement>>
                as="rect"
                fill={data.color}
                d="M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2"
                animated={{
                  initialStyle: { height: 0 },
                  transitions: {
                    entering: { height: 156.01 },
                    exiting: { height: 0 },
                  },
                }}
                width={88.1}
                rx={17.2}
                x={128.35}
                y={21.75}
                style={{ transition: 'height 0.4s ease' }}
              />
            </Animator>
          )}
          {data.visible[2] && (
            <Animator merge combine duration={{ offset: 0.1 }}>
              <Animated<SVGRectElement, SVGProps<SVGRectElement>>
                as="rect"
                fill={data.color}
                d="M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2"
                animated={{
                  initialStyle: { height: 0 },
                  transitions: {
                    entering: { height: 156.01 },
                    exiting: { height: 0 },
                  },
                }}
                width={88.1}
                rx={17.2}
                x={232.45}
                y={21.75}
                style={{ transition: 'height 0.4s ease' }}
              />
            </Animator>
          )}
          <Animated<SVGRectElement, SVGProps<SVGRectElement>>
            as="rect"
            fill="none"
            d="M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2"
            animated={{
              initialStyle: { strokeDashoffset: 1100 },
              transitions: {
                entering: { strokeDashoffset: 0 },
                exiting: { strokeDashoffset: 1100 },
              },
            }}
            height={333.81}
            width={188.5}
            rx={17.2}
            stroke={data.color}
            strokeWidth={11}
            strokeDasharray={1100}
            transform="rotate(90 2405.35 445.05)"
            x={1965.8}
            y={2511.09}
          />
        </svg>
      </Tooltip>
    </Animator>
  );
}
