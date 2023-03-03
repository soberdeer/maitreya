import React, { useMemo } from 'react';
import { Text } from '../../../../arwes';
import useStyles from './TextWithElements.styles';
import ElementTags from '../../../../ElementTags/ElementTags';

export default function TextWithElements({ children }: { children: string }) {
  const classes = useStyles();
  const splittedText = useMemo(() => children.split(' -- '), [children]);

  return (
    <div className={classes.root}>
      <ElementTags elements={splittedText[1]} />
      <Text as="p" style={{ marginBottom: 0, lineHeight: '26px' }}>
        {splittedText[0]}
      </Text>
    </div>
  );
}
