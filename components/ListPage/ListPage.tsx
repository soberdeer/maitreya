// @ts-nocheck
import React from 'react';
import { Entry } from 'contentful';
import { Text } from '../arwes';
import { PageProps } from '../../util/types';
import Block from '../Block/Block';
import useStyles from './ListPage.styles';

export interface ListInterface {
  data: Entry<PageProps>;
}

export default function ListPage({ data }: ListInterface) {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Text as="h1" style={{ paddingBottom: 40 }} palette="secondary">
        {data.fields.name}
      </Text>
      {data.fields.blocks.map((entry, index) => (
        <div className={classes.link} key={index}>
          <Block {...entry.fields} middleLink={data.fields.slug} />
        </div>
      ))}
    </div>
  );
}
