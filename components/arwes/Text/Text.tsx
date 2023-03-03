// @ts-nocheck
import React, { useContext } from 'react';
import cx from 'clsx';
import { Text as ArwesText, TextProps as ArwesTextProps } from '@arwes/core';
import colors from '../../../styles/colors';
import PaletteContext from '../../contexts/PaletteContext';
import useStyles from './Text.styles';

export interface TextProps extends ArwesTextProps {
  palette?: keyof typeof colors;
  noShadow?: boolean;
  styledFont?: boolean;
  withHover?: boolean;
  children: React.ReactNode;
}

export default function Text({
  className,
  palette = 'primary',
  noShadow,
  style = {},
  as = 'span',
  styledFont = false,
  children,
  withHover,
  ...others
}: TextProps & React.HTMLProps<typeof as>) {
  const { palette: paletteObject } = useContext(PaletteContext);
  const classes = useStyles({ paletteObject, palette, styled: styledFont, as });

  return (
    <ArwesText
      className={cx(classes.root, className, {
        [classes.hover]: withHover,
        [classes.noShadow]: noShadow,
      })}
      as={as}
      style={{
        ...(styledFont
          ? {
              fontFamily: '"Arounder", sans-serif',
              // letterSpacing: [ '.2rem', '!important'],
            }
          : {
              // letterSpacing: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(as) ? '.1rem' : 'normal',
            }),
        ...style,
      }}
      {...others}
    >
      {children}
    </ArwesText>
  );
}
