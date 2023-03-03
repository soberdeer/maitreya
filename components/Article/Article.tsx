import React, { useContext } from 'react';
import { Text } from '../arwes';
import { Document } from '@contentful/rich-text-types';
import { Breadcrumbs } from '@mantine/core';
import colors from '../../styles/colors';
import RichText from '../RichText/RichText';
import FrameWrapper, { FrameWrapperProps } from '../FrameWrapper/FrameWrapper';
import Anchor from '../Anchor/Anchor';
import PaletteContext from '../contexts/PaletteContext';

export interface ArticleProps extends FrameWrapperProps {
  description?: Document;
  name: string;
  tags?: string;
  breadcrumbs?: { title: string; href: string }[];
}

export default function Article({
  description,
  name,
  children,
  breadcrumbs,
  ...others
}: ArticleProps) {
  const { palette } = useContext(PaletteContext);

  return (
    <FrameWrapper {...others}>
      {breadcrumbs && (
        <Breadcrumbs pb={30} styles={{ separator: { color: palette.primary.main } }}>
          {breadcrumbs.map((item, index) => (
            <Anchor href={item.href} key={index}>
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>
      )}
      <Text as="h1" palette="secondary" styledFont>
        {name}
      </Text>
      {description && <RichText content={description} />}
      {children}
    </FrameWrapper>
  );
}
