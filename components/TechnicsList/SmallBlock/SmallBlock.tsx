import React from 'react';
import { Entry } from 'contentful';
import { StandProps, TechnicProps, TechnicStateType } from '../../../util/types';
import Element from '../Element/Element';

export interface SmallBlockProps {
  data: Entry<StandProps | TechnicProps>[];
  filter: TechnicStateType;
  style?: Record<string, any>;
}

const keysStates = {
  combat: 'Только в фуге',
  all: 'И в фуге, и вне фуги',
  peace: 'Только вне фуги',
};

export const getDisplay = (item: Entry<StandProps | TechnicProps>, filter?: TechnicStateType) => {
  if (!filter || filter === 'Все') {
    return 'block';
  }

  const isStand = item.sys.contentType.sys.id === 'stands';

  if (keysStates.combat.includes(filter.toLowerCase())) {
    return isStand || item.fields.state !== keysStates.peace ? 'block' : 'none';
  }

  if (keysStates.peace.includes(filter.toLowerCase())) {
    return isStand || item.fields.state !== keysStates.combat ? 'block' : 'none';
  }
};

export default function SmallBlock({ data, filter, style }: SmallBlockProps) {
  if (data.length === 0) {
    return null;
  }

  return data.map((item, index) => {
    return (
      <Element
        item={item}
        key={index}
        style={{
          ...style,
          display: getDisplay(item, filter),
        }}
      />
    );
  });
}
