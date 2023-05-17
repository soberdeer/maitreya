import React from 'react';
import { Animator, Text } from '@arwes/react';
import { Document } from '@contentful/rich-text-types';
import { Breadcrumbs, useMantineTheme } from '@mantine/core';
import { RichText } from '@src/components/RichText';
import { FrameWrapper } from '@src/components/FrameWrapper';
import { Anchor } from '@src/components/Anchor';

export interface ArticleProps {
  description?: Document;
  name?: string;
  breadcrumbs?: { title: string; href: string }[];
  children?: React.ReactNode;
}

export function Article({ description, name, children, breadcrumbs }: ArticleProps) {
  const theme = useMantineTheme();
  return (
    <Animator combine manager="stagger">
      <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
        <FrameWrapper>
          {breadcrumbs && (
            <Breadcrumbs
              pb={30}
              styles={{
                root: { alignItems: 'flex-start' },
                breadcrumb: {
                  whiteSpace: 'normal',
                },
                separator: { color: theme.colors.maitreya[3], height: '100%' },
              }}
            >
              {breadcrumbs.map((item, index) => (
                <Animator duration={{ delay: 0.4, stagger: 0.1 }}>
                  <Anchor href={item.href} key={index}>
                    {item.title}
                  </Anchor>
                </Animator>
              ))}
            </Breadcrumbs>
          )}
          {name && (
            <Animator duration={{ delay: 0.4, stagger: 0.1 }}>
              <Text as="h1">{name}</Text>
            </Animator>
          )}
          {description && (
            <Animator merge duration={{ delay: 0.4, stagger: 0.1 }}>
              <RichText content={description} />
            </Animator>
          )}
          {children}
        </FrameWrapper>
      </Animator>
    </Animator>
  );
}
