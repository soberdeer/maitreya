import React from 'react';
import { Text } from '@arwes/react';
import { TypeArticles } from '@src/util/types';
import { FrameWrapper } from '@src/components/FrameWrapper';
import { Anchor } from '@src/components/Anchor';
import useStyles from './ReferencesBlock.styles';

export interface ReferencesBlockProps {
  data: TypeArticles;
  scheme: {
    href: string;
    children: string;
  };
}

export function ReferencesBlock({ data, scheme }: ReferencesBlockProps) {
  const { classes } = useStyles();
  return (
    <FrameWrapper className={classes.wrapper}>
      <Text as="h1">Дополнительно</Text>
      {data.fields.references?.map((reference, index: number) =>
        reference?.sys.id ? (
          <div key={index} className={classes.link}>
            <Anchor href={`${scheme.href}/${reference?.sys.id}`} styled color="maitreyaSecondary">
              {reference.fields.name}
            </Anchor>
          </div>
        ) : null
      )}
    </FrameWrapper>
  );
}
