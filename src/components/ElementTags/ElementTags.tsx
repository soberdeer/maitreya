import React from 'react';
import { Group, GroupProps, SimpleGrid } from '@mantine/core';
import { useElements } from '@src/hooks/use-elements';
import { ElementStamp } from '@src/components/ElementStamp';
import { Animator } from '@arwes/react';

export interface ElementTagsProps extends GroupProps {
  elements: string;
  noWrap?: boolean;
}

export function ElementTags({ className, elements, noWrap, ...others }: ElementTagsProps) {
  const { elements: elementsData } = useElements();

  if (!elements) {
    return null;
  }

  return (
    <Animator manager="stagger" combine>
      {!noWrap && elements.length > 2 ? (
        <SimpleGrid cols={2} spacing={10} py={5} className={className} {...others}>
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
        </SimpleGrid>
      ) : (
        <Group
          spacing={10}
          position="left"
          align="center"
          className={className}
          noWrap={noWrap}
          {...others}
        >
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
      )}
    </Animator>
  );
}
