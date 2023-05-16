import React from 'react';
import { Text } from '@arwes/react';
import { Document } from '@contentful/rich-text-types';
import { Breadcrumbs, useMantineTheme } from '@mantine/core';
import { RichText } from '@src/components/RichText';
import { FrameWrapper } from '@src/components/FrameWrapper';
import { Anchor } from '@src/components/Anchor';

export interface ArticleProps {
  description?: Document;
  name: string;
  breadcrumbs?: { title: string; href: string }[];
  children?: React.ReactNode;
}

export function Article({ description, name, children, breadcrumbs }: ArticleProps) {
  const theme = useMantineTheme();
  return (
    <FrameWrapper>
      {breadcrumbs && (
        <Breadcrumbs
          pb={30}
          styles={{
            root: { alignItems: 'flex-start' },
            breadcrumb: {
              whiteSpace: 'normal',
            },
            separator: { color: theme.colors.maitreya[3] },
          }}
        >
          {breadcrumbs.map((item, index) => (
            <Anchor href={item.href} key={index}>
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>
      )}
      <Text as="h1">{name}</Text>
      {description && <RichText content={description} />}
      {children}
    </FrameWrapper>
  );
}
