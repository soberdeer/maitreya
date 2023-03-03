// @ts-nocheck
import React from 'react';
import cx from 'clsx';
import { Entry } from 'contentful';
import { ArticleProps } from '../../util/types';
import { Text } from '../arwes';
import Anchor from '../Anchor/Anchor';
import useStyles from './Block.styles';

export interface BlockProps extends Omit<React.HTMLProps<HTMLDivElement>, 'list'> {
  name?: string;
  list: Entry<ArticleProps>[];
  middleLink?: string[];
}

export default function Block({ className, name, list, middleLink, ...others }: BlockProps) {
  const classes = useStyles();

  return (
    <div className={cx(classes.root, className)} {...others}>
      <Text as="h3" style={{ paddingBottom: 20 }}>
        {name}
      </Text>
      {list.map((entry, index) => (
        <div className={classes.link} key={index}>
          <Anchor
            href={`${middleLink ? `/${middleLink}` : ''}/${entry.sys.id}`}
            palette="secondary"
            styledFont
          >
            {entry.fields.name}
          </Anchor>
        </div>
      ))}
    </div>
  );
}
