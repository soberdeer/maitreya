import React from 'react';
import { Text } from '@arwes/react';
import { Box, BoxProps } from '@mantine/core';
import { TypeArticles, TypePage } from '@src/util/types';
import { Block } from '@src/components/Block';
import useStyles from './ListPage.styles';

interface ListPageProps extends BoxProps {
  data: TypePage;
}

export function ListPage({ className, data, ...rest }: ListPageProps) {
  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes.content, className)} {...rest}>
      <Text as="h1" className={classes.title}>
        {data.fields.name}
      </Text>
      {data.fields.blocks?.map((entry, index) =>
        entry ? (
          <Box className={classes.link} key={index}>
            <Block
              list={entry?.fields.list as TypeArticles[]}
              name={entry?.fields.name}
              middleLink={data.fields.slug}
            />
          </Box>
        ) : null
      )}
    </Box>
  );
}
