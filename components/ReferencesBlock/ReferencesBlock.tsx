import React from 'react';
import { Entry } from 'contentful';
import { ArticleProps } from '../../util/types';
import FrameWrapper from '../FrameWrapper/FrameWrapper';
import Anchor from '../Anchor/Anchor';
import { Text } from '../arwes';
import useStyles from './ReferencesBlock.styles';

export interface ReferencesBlockProps {
  data: Entry<ArticleProps>;
  scheme: {
    href: string;
    children: string;
  };
}

export default function ReferencesBlock({ data, scheme }: ReferencesBlockProps) {
  const classes = useStyles();
  return (
    <FrameWrapper noHeader style={{ marginTop: 20 }}>
      <Text as="h1">Дополнительно</Text>
      {data.fields.references.map((reference: Entry<ArticleProps>, index: number) => (
        <div key={index} className={classes.link}>
          <Anchor href={`${scheme.href}/${reference.sys.id}`} styledFont palette="secondary">
            {reference.fields.name}
          </Anchor>
        </div>
      ))}
    </FrameWrapper>
  );
}
