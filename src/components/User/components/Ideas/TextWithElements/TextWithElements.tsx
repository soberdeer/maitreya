import React, { useMemo } from 'react';
import { Text, TextProps, AnimatorProps, Animator } from '@arwes/react';
import { ElementTags } from '@src/components/ElementTags';
import useStyles from './TextWithElements.styles';

export default function TextWithElements({
  children,
  className,
  style,
  animator,
  textProps,
  as,
  noWrap,
}: {
  as?: keyof HTMLElementTagNameMap;
  children: string;
  className?: string;
  style?: Record<string, any>;
  animator?: AnimatorProps;
  textProps?: Omit<TextProps, 'children'>;
  noWrap?: boolean;
}) {
  const { classes, cx } = useStyles();
  const { style: textStyle, ...textRest } = textProps || {};
  const splittedText = useMemo(() => children.split(' -- '), [children]);

  return (
    <div className={cx(classes.root, className)} style={style}>
      <Animator {...animator}>
        <ElementTags elements={splittedText[1]} noWrap={noWrap} />
        <Text
          as={as || 'p'}
          style={{ marginBottom: 0, lineHeight: '26px', ...(textStyle || {}) }}
          {...(textRest || {})}
        >
          {splittedText[0]}
        </Text>
      </Animator>
    </div>
  );
}
