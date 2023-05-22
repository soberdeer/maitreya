import React, { useMemo } from 'react';
import { Animator, Text } from '@arwes/react';
import { translit } from '@src/util/translit';
import { Document } from '@contentful/rich-text-types';
import { Box, Breadcrumbs, Stack, useMantineTheme } from '@mantine/core';
import { RichText } from '@src/components/RichText';
import { FrameWrapper } from '@src/components/FrameWrapper';
import { Anchor } from '@src/components/Anchor';

export interface ArticleProps {
  description?: Document;
  name?: string;
  breadcrumbs?: { title: string; href: string }[];
  children?: React.ReactNode;
  toc?: {
    name: string;
    id: string;
  }[];
}

export function Article({ description, name, children, breadcrumbs, toc }: ArticleProps) {
  const translitedName = useMemo(() => translit(name), [name]);
  const theme = useMantineTheme();
  return (
    <FrameWrapper>
      {breadcrumbs && (
        <Breadcrumbs
          pb={30}
          styles={{
            root: { alignItems: 'center' },
            breadcrumb: {
              whiteSpace: 'normal',
            },
            separator: { color: theme.colors.maitreya[3], height: '100%' },
          }}
        >
          {breadcrumbs.map((item, index) => (
            <Animator duration={{ delay: 0.4, stagger: 0.1 }} key={index}>
              <Anchor href={item.href}>{item.title}</Anchor>
            </Animator>
          ))}
        </Breadcrumbs>
      )}
      {name && (
        <Animator duration={{ delay: 0.4, stagger: 0.1 }}>
          <Text as="h1" {...(translitedName ? { id: translitedName } : {})}>
            {name}
          </Text>
        </Animator>
      )}
      {toc && (
        <Box mb={50}>
          <Animator duration={{ delay: 0.4, stagger: 0.1 }}>
            <Text as="h2">Оглавление</Text>
            <Stack ml="1rem">
              {toc.map(({ name: tocName, id }) => (
                <Anchor href={`#${id}`} styled key={id}>
                  {`- ${tocName}`}
                </Anchor>
              ))}
            </Stack>
          </Animator>
        </Box>
      )}
      {description && (
        <Animator merge duration={{ delay: 0.4, stagger: 0.1 }}>
          <RichText content={description} />
        </Animator>
      )}
      {children}
    </FrameWrapper>
  );
}
