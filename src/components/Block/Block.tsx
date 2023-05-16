import React from 'react';
import { Animator, Text } from '@arwes/react';
import { Box, BoxProps } from '@mantine/core';
import { Anchor } from '@src/components/Anchor';
import { TypeArticles } from '@src/util/types';
import useStyles from './Block.styles';

export interface BlockProps extends BoxProps {
  name?: string;
  list?: TypeArticles[];
  middleLink?: string;
}

export function Block({ className, name, list, middleLink, ...rest }: BlockProps) {
  const { classes, cx } = useStyles();
  return (
    <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
      <Box className={cx(classes.root, className)} {...rest}>
        <Text as="h3" className={classes.title} color="maitreya">
          {name}
        </Text>
        <Animator merge duration={{ delay: 0.4, stagger: 0.1 }}>
          {list?.map((entry, index) => (
            <div className={classes.link} key={index}>
              <Anchor
                href={`${middleLink ? `/${middleLink}` : ''}/${entry.sys.id}`}
                color="maitreyaSecondary"
                styled
              >
                <Text as="span">{entry.fields.name}</Text>
              </Anchor>
            </div>
          ))}
        </Animator>
      </Box>
    </Animator>
  );
}
