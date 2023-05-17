import React from 'react';
import {
  AllTechnicStateType,
  TypeStands,
  TypeCombat,
  TypeRituals,
  isTypeStands,
} from '@src/util/types';
import { Element } from '../Element';

export interface SmallBlockProps {
  data: (TypeCombat | TypeStands | TypeRituals)[];
  // filter?: AllTechnicStateType;
  style?: Record<string, any>;
}

const keysStates = {
  combat: 'Только в фуге',
  all: 'И в фуге, и вне фуги',
  peace: 'Только вне фуги',
};

export const getDisplay = (
  item: TypeStands | TypeCombat | TypeRituals,
  filter?: AllTechnicStateType
) => {
  if (!filter || filter === 'Все') {
    return 'block';
  }

  if (keysStates.combat.includes(filter.toLowerCase())) {
    return isTypeStands(item) || (item as TypeCombat).fields.state !== keysStates.peace
      ? 'block'
      : 'none';
  }

  if (keysStates.peace.includes(filter.toLowerCase())) {
    return isTypeStands(item) || (item as TypeCombat).fields.state !== keysStates.combat
      ? 'block'
      : 'none';
  }

  return 'none';
};

export function SmallBlock({ data, style }: SmallBlockProps) {
  if (data.length === 0) {
    return null;
  }
  // getDisplay(item, filter)
  return (
    <>
      {data.map((item, index) => (
        <Element
          item={item}
          key={index}
          sx={{
            ...style,
            // display: getDisplay(item, filter),
          }}
        />
      ))}
    </>
  );
}
