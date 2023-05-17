import React, { useEffect, useMemo, useState } from 'react';
import { Asset, AssetDetails } from 'contentful';
import {
  AspectRatio,
  Box,
  BoxProps,
  Center,
  Image as MantineImage,
  ImageProps as MantineImageProps,
} from '@mantine/core';
import { aaVisibility, Animated, Animator, Text } from '@arwes/react';
import { Loader } from '@src/components/Loader';
import { Frame } from '@src/components/Frame';
import useStyles from './Image.styles';
import { useElementSize } from '@mantine/hooks';
import { aaOpacity } from '@arwes/react-animated/build/esm/animations/animations';

export interface ImageProps extends BoxProps {
  image: Asset;
  imageProps?: Omit<MantineImageProps, 'placeholder' | 'withPlaceholder' | 'src' | 'alt'>;
  children?: React.ReactNode;
  fullImage?: boolean;
}

export function Image({ className, image, children, imageProps, fullImage }: ImageProps) {
  const { classes, cx } = useStyles();
  const { ref, width, height } = useElementSize();
  const aspect = useMemo(() => {
    console.log(image);
    if (image && image.fields.file) {
      const { width: imageWidth, height: imageHeight } = (image.fields.file.details as AssetDetails)
        .image!;
      return imageWidth / imageHeight;
    }
    return 16 / 9;
  }, [image]);

  return (
    <AspectRatio
      ratio={aspect}
      mah={400}
      mx="auto"
      sx={{ width: '100%' }}
      className={cx(classes.root, className)}
    >
      <Box ref={ref}>
        <Frame>
          <Animator manager="stagger" duration={{ enter: 0.4, exit: 0.4, delay: 10 }}>
            <Animated animated={[aaOpacity(), aaVisibility()]}>
              <MantineImage
                className={cx(classes.img, imageProps?.className)}
                src={image.fields.file?.url as string}
                alt={(image.fields.title as string) || ''}
                {...(imageProps || {})}
                withPlaceholder
                classNames={{
                  imageWrapper: classes.holder,
                  placeholder: image.fields.file!.url
                    ? classes.placeholder
                    : classes.errorPlaceholder,
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
        </Frame>
      </Box>
    </AspectRatio>
  );
}
