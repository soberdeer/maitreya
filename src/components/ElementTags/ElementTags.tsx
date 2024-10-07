import React from 'react';
import { Center, Grid, Group, GroupProps } from '@mantine/core';
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
        <Grid py={5} grow gutter="0.625rem" className={className} sx={{ minWidth: 68 }} {...others}>
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
              return (
                <Grid.Col key={index} span={6} p={0}>
                  <Center pt={index === 2 ? '0.625rem' : 0}>
                    <ElementStamp p={0} element={element.eng_key as unknown as string} />
                  </Center>
                </Grid.Col>
              );
            })}
        </Grid>
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
