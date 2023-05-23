import React, { useMemo } from 'react';
import { Text } from '@arwes/react';
import { TypeElementsFields } from '@src/util/types';
import { mapElements } from '@src/components/User/components/RadarChart/map-elements';
import { useMediaQuery } from '@mantine/hooks';

const coordinatesMap = {
  water: { x: -20, y: 0 },
  earth: { x: 5, y: -25 },
  fire: { x: -15, y: -45 },
  wood: { x: -30, y: -20 },
  metal: { x: -10, y: 0 },
};

export interface TickProps {
  elements: TypeElementsFields[];
  payload: {
    coordinate: number;
    index: number;
    offset: number;
    value: string;
  };
  x: number;
  y: number;
  penalties: {
    name: string;
    penalty: number;
  }[];
  textClassName: string;
}

export default function Tick({
  payload,
  x,
  y,
  elements: initialElements,
  penalties,
  textClassName,
}: TickProps) {
  const elements = useMemo(() => mapElements(initialElements), [initialElements]);
  const el = elements.find((item) => item.name?.toLowerCase() === payload.value.toLowerCase());
  const penaltyObj = penalties.find(
    (item) => item.name.toLowerCase() === payload.value.toLowerCase()
  );
  const isSmall = useMediaQuery('(max-width: 400px)');

  const coordinates = {
    x: x + (coordinatesMap[el?.eng_key?.toLowerCase() as keyof typeof coordinatesMap]?.x || 0),
    y: y + (coordinatesMap[el?.eng_key?.toLowerCase() as keyof typeof coordinatesMap]?.y || 0),
  };

  const addition = useMemo(() => (isSmall ? 5 : 0), [isSmall]);
  return el ? (
    <g>
      <circle
        stroke={el.color as unknown as string}
        fill="none"
        cx={coordinates.x + 15}
        cy={coordinates.y + 15}
        r={isSmall ? 13.4 : 20}
      />
      <circle
        fill="#021114"
        opacity={0.2}
        cx={coordinates.x + 15}
        cy={coordinates.y + 15}
        r={isSmall ? 13.4 : 20}
      />
      <image
        y={el.eng_key === 'earth' ? coordinates.y - 3 + addition : coordinates.y + addition}
        x={el.eng_key === 'wood' ? coordinates.x - 1 + addition : coordinates.x + addition}
        width={isSmall ? 20 : 30}
        height={isSmall ? 20 : 30}
        href={(el?.image?.fields.file?.url as string) || ''}
        color={el.color}
      />
      {(penaltyObj?.penalty || 0) > 0 && (
        <>
          <rect
            fill="#F03E3E"
            x={coordinates.x + 20 + 2 * (penaltyObj?.penalty.toString().length || 0)}
            y={coordinates.y - 12.5}
            stroke="#05201f"
            strokeWidth={2}
            height={24}
            width={16 + 8 * (penaltyObj?.penalty.toString().length || 0)}
            rx={12}
          />
          <text x={coordinates.x + 26} y={coordinates.y + 5} className={textClassName}>
            {`-${penaltyObj?.penalty}`}
          </text>
        </>
      )}
    </g>
  ) : (
    <Text>payload.value</Text>
  );
}
