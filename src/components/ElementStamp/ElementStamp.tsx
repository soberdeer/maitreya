import React from 'react';
import { BoxProps } from '@mantine/core';
import { Fire } from '@src/components/ElementStamp/Fire';
import { Water } from '@src/components/ElementStamp/Water';
import { Wood } from '@src/components/ElementStamp/Wood';
import { Metal } from '@src/components/ElementStamp/Metal';
import { Earth } from '@src/components/ElementStamp/Earth';
import { ElementWrapper } from '@src/components/ElementStamp/ElementWrapper';
import { Animator } from '@arwes/react';

type elementType = 'fire' | 'water' | 'earth' | 'wood' | 'metal';

const map: Record<elementType, any> = {
  fire: Fire,
  water: Water,
  wood: Wood,
  metal: Metal,
  earth: Earth,
};

const colors: Record<elementType, any> = {
  fire: '#E42747',
  water: '#66D9E8',
  wood: '#18D66A',
  metal: '#E9ECEF',
  earth: '#daad6d',
};

interface ElementStampProps extends BoxProps {
  element: string;
}

export function ElementStamp({ element, ...rest }: ElementStampProps) {
  const Element = map[element as elementType] ? map[element as elementType] : null;

  if (!Element) {
    return null;
  }
  return (
    <Animator>
      <ElementWrapper color={colors[element as elementType]} {...rest}>
        <Element color={colors[element as elementType]} />
      </ElementWrapper>
    </Animator>
  );
}
