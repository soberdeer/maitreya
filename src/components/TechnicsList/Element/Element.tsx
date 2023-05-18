import React, { useMemo } from 'react';
import { Group, GroupProps } from '@mantine/core';
import { Animator, Text } from '@arwes/react';
import { TypeStands, TypeCombat, TypeRituals, isTypeCombat } from '@src/util/types';
import { LevelIcon, StandardIcon } from '@src/components/icons';
import { Anchor } from '../../Anchor/Anchor';

export interface Element extends GroupProps {
  item: TypeStands | TypeCombat | TypeRituals;
}

const keys = {
  warrior: 'воин',
  telepath: 'телепат',
  healer: 'целитель',
  navigator: 'навигатор',
};

const standardColors = {
  [keys.warrior]: '#f06595',
  [keys.telepath]: '#a9e34b',
  [keys.healer]: '#51cf66',
  [keys.navigator]: '#4dabf7',
};

export function Element({ item, ...others }: Element) {
  const levelKey = useMemo(
    () =>
      item.fields.level === 'Ученик' ? 'pupil' : item.fields.level === 'Адепт' ? 'adept' : 'master',
    [item]
  );

  return (
    <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
      <Group spacing={10} position="left" mb={10} {...others}>
        <LevelIcon level={levelKey} size={30} tooltip={item.fields.level} />

        <Anchor href={`/technics/${item.sys.id}`}>
          <Animator merge duration={{ delay: 0.2 }}>
            <Text as="span">{item.fields.name as string}</Text>
          </Animator>
        </Anchor>

        {isTypeCombat(item) &&
          (item as TypeCombat).fields.standard?.map((name, index) => (
            <Animator merge duration={{ delay: 0.2 }} key={index}>
              <StandardIcon
                tooltip={`Имперский Стандарт - ${name}`}
                size={20}
                color={standardColors[name.toLowerCase() as keyof typeof standardColors]}
              />
            </Animator>
          ))}
      </Group>
    </Animator>
  );
}
