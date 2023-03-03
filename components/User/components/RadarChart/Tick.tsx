import React from 'react';
import { ElementProps } from '../../../../util/types';

const coordinatesMap = {
  water: { x: -20, y: 0 },
  earth: { x: 5, y: -25 },
  fire: { x: -15, y: -45 },
  wood: { x: -30, y: -20 },
  metal: { x: -10, y: 0 },
};

export interface TickProps {
  elements: ElementProps[];
  className: string;
  cx: number;
  cy: number;
  fill?: string;
  index: number;
  orientation: 'outer' | 'inner';
  payload: {
    coordinate: number;
    index: number;
    offset: number;
    value: string;
  };
  radius?: number;
  stroke?: string;
  textAnchor: string;
  type: string;
  x: number;
  y: number;
}

export default function Tick({ payload, x, y, elements }: TickProps) {
  const el = elements.find((el) => el.name.toLowerCase() === payload.value.toLowerCase());

  const coordinates = {
    x: x + (coordinatesMap[el.eng_key.toLowerCase()]?.x || 0),
    y: y + (coordinatesMap[el.eng_key.toLowerCase()]?.y || 0),
  };

  return el ? (
    <g>
      <circle
        stroke={el.color}
        fill="none"
        cx={coordinates.x + 15}
        cy={coordinates.y + 15}
        r={20}
      />
      <circle fill="#021114" opacity={0.2} cx={coordinates.x + 15} cy={coordinates.y + 15} r={20} />
      <image
        y={el.eng_key === 'earth' ? coordinates.y - 3 : coordinates.y}
        x={el.eng_key === 'wood' ? coordinates.x - 1 : coordinates.x}
        width="30"
        height="30"
        href={el?.image.fields.file.url}
        color={el.color}
      />
    </g>
  ) : (
    payload.value
  );
}
