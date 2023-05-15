import React from 'react';
import { Group, GroupProps } from '@mantine/core';
import { useElements } from '@src/hooks/use-elements';
import { ElementStamp } from '@src/components/ElementStamp';
import { Animator } from '@arwes/react';
import useStyles from './ElementTags.styles';

export interface ElementTagsProps extends GroupProps {
  elements: string;
}

export function ElementTags({ className, elements, ...others }: ElementTagsProps) {
  const { classes, cx } = useStyles();
  const { elements: elementsData } = useElements();

  if (!elements) {
    return null;
  }

  return (
    <Group className={cx(classes.root, className)} {...others}>
      <Animator manager="stagger" combine>
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
      </Animator>
    </Group>
  );
}
