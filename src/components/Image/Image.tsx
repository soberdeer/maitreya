import React from 'react';
import { Asset } from 'contentful';
import {
  AspectRatioProps,
  Box,
  Center,
  Image as MantineImage,
  ImageProps as MantineImageProps,
} from '@mantine/core';
import { aaVisibility, Animated, Animator, Text } from '@arwes/react';
import { Loader } from '@src/components/Loader';
import { aaOpacity } from '@arwes/react-animated/build/esm/animations/animations';
import useStyles from './Image.styles';

export interface ImageProps extends Omit<AspectRatioProps, 'ratio'> {
  image: Asset;
  imageProps?: Omit<MantineImageProps, 'placeholder' | 'withPlaceholder' | 'src' | 'alt'>;
  children?: React.ReactNode;
  fullImage?: boolean;
}

export function Image({ className, image, children, imageProps }: ImageProps) {
  const { classes, cx } = useStyles();

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }} className={cx(classes.root, className)}>
      <Animator manager="stagger" duration={{ enter: 0.4, exit: 0.4, delay: 10 }}>
        <Animated animated={[aaOpacity(), aaVisibility()]} style={{ height: '100%' }}>
          <MantineImage
            // className={cx(classes.img, imageProps?.className)}
            src={image.fields.file?.url as string}
            alt={(image.fields.title as string) || ''}
            {...(imageProps || {})}
            fit="contain"
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
        </Animated>
      </Animator>
    </Box>
  );
}
