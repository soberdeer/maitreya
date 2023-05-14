import React from 'react';
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from './options';
import useStyles from './RichText.styles';

export interface RichTextProps extends Omit<React.HTMLProps<HTMLDivElement>, 'content'> {
  content: Document;
  fullImage?: boolean;
}

export function RichText({
  className,
  content,
  children,
  fullImage = false,
  ...others
}: RichTextProps) {
  const { classes, cx, theme } = useStyles();
  return (
    <div className={cx(classes.root, className)} {...others}>
      {documentToReactComponents(content, options(classes, theme, fullImage))}
      {children}
    </div>
  );
}
