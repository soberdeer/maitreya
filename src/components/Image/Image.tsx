import React from 'react';
import { Asset } from 'contentful';
import {
  Box,
  BoxProps,
  Center,
  Image as MantineImage,
  ImageProps as MantineImageProps,
} from '@mantine/core';
import { Text } from '@arwes/react';
import { Loader } from '@src/components/Loader';
import { Frame } from '@src/components/Frame';
import useStyles from './Image.styles';

export interface ImageProps extends BoxProps {
  image: Asset;
  imageProps?: Omit<MantineImageProps, 'placeholder' | 'withPlaceholder' | 'src' | 'alt'>;
  children?: React.ReactNode;
  fullImage?: boolean;
}

export function Image({ className, image, children, imageProps, fullImage }: ImageProps) {
  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes.root, className)}>
      <Frame>
        <MantineImage
          className={cx(classes.img, imageProps?.className)}
          src={image.fields.file?.url as string}
          alt={(image.fields.title as string) || ''}
          {...(imageProps || {})}
          withPlaceholder
          classNames={{
            imageWrapper: classes.holder,
            placeholder: image.fields.file!.url ? classes.placeholder : classes.errorPlaceholder,
            figure: classes.imageWrapper,
            caption: classes.children,
            image: classes.img,
          }}
          placeholder={
            <Center sx={{ height: '100%' }}>
              {image.fields.file!.url ? (
                <Loader />
              ) : (
                <Text as="div" className={classes.error}>
                  [ ДАННЫЕ УДАЛЕНЫ ]
                </Text>
              )}
            </Center>
          }
          caption={children}
        />
      </Frame>
    </Box>
  );
}
