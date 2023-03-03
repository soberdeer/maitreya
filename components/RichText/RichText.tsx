// @ts-nocheck
import React, { useContext } from 'react';
import cx from 'clsx';
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from './options';
import useStyles from './RichText.styles';
import PaletteContext from '../contexts/PaletteContext';

export interface RichTextProps extends Omit<React.HTMLProps<HTMLDivElement>, 'content'> {
  content: Document;
  fullImage?: boolean;
}

export default function RichText({
  className,
  content,
  children,
  fullImage = false,
  ...others
}: RichTextProps) {
  const classes = useStyles();
  const { palette } = useContext(PaletteContext);
  return (
    <div className={cx(classes.root, className)} {...others}>
      {documentToReactComponents(content, options(classes, fullImage, palette))}
      {children}
    </div>
  );
}
