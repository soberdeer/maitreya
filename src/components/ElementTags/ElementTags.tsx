import React from 'react';
import { Group, GroupProps } from '@mantine/core';
import { useElements } from '@src/hooks/use-elements';
import { ElementStamp } from '@src/components/ElementStamp';
import { Animator } from '@arwes/react';

export interface ElementTagsProps extends GroupProps {
  elements: string;
}

export function ElementTags({ className, elements, ...others }: ElementTagsProps) {
  const { elements: elementsData } = useElements();

  if (!elements) {
    return null;
  }

  return (
    <Animator manager="stagger" combine>
      <Group spacing={10} position="left" align="center" className={className} {...others}>
        {elements
          .toLowerCase()
          .split('')
          .map((elementKey, index) => {
            const element = elementsData.find(
              (el) => (el?.shortname as unknown as string)?.toLowerCase() === elementKey
            );
            if (!element) {
              return null;
            }
            return <ElementStamp key={index} element={element.eng_key as unknown as string} />;
          })}
      </Group>
    </Animator>
  );
}
