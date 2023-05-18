import React, { useMemo } from 'react';
import { Text, TextProps, AnimatorProps, Animator } from '@arwes/react';
import { ElementTags } from '@src/components/ElementTags';
import { Group } from '@mantine/core';
import useStyles from './TextWithElements.styles';

export function TextWithElements({
  children,
  className,
  style,
  animator,
  textProps,
  as,
}: {
  as?: keyof HTMLElementTagNameMap;
  children: string;
  className?: string;
  style?: Record<string, any>;
  animator?: AnimatorProps;
  textProps?: Omit<TextProps, 'children'>;
}) {
  const { classes } = useStyles();
  const { style: textStyle, ...textRest } = textProps || {};
  const splittedText = useMemo(() => children.split(' -- '), [children]);

  return (
    <Animator {...animator}>
      <Group position="left" align="center" spacing={10} style={style} className={className} noWrap>
        <ElementTags elements={splittedText[1]} noWrap={splittedText[1].length < 3} />
        <Text as={as || 'p'} className={classes.text} style={textStyle} {...(textRest || {})}>
          {splittedText[0]}
        </Text>
      </Group>
    </Animator>
  );
}
