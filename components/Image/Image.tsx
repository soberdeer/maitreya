import React, { useEffect, useState, useRef, useContext } from 'react';
import { Collapse } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { openModal } from '../../util/openModal';
import { Figure, FigureProps } from '../arwes';
import ModalContent from './ModalContent';
import { useActivate } from '../../hooks/use-activate';
import useStyles from './Image.styles';
import PaletteContext from '../contexts/PaletteContext';

export interface ImageProps extends FigureProps {
  fullImage?: boolean;
  imageWidth?: number;
  imageHeight?: number;
}

export default function Image({
  style = {},
  imgProps,
  fluid = true,
  children,
  fullImage,
  imageWidth,
  imageHeight,
  ...others
}: ImageProps) {
  const { palette } = useContext(PaletteContext);
  const classes = useStyles({ palette });
  const { activate } = useActivate(true);
  const { width } = useViewportSize();
  const imageRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>('auto');
  const [secondRender, setSecondRender] = useState(false);

  const openImageModal = () =>
    openModal({
      children: (
        <ModalContent style={style} imgProps={imgProps} fluid={fluid} {...others}>
          {children}
        </ModalContent>
      ),
      styles: {
        body:
          width < 720
            ? {
                display: 'flex',
                height: '100%',
                alignItems: 'center',
                paddingBottom: 50,
              }
            : {},
      },
      fullScreen: width < 720,
    });

  const updateAsyncHeight = async () => {
    if (imageWidth && imageHeight && wrapperRef.current) {
      setHeight((imageHeight / imageWidth) * wrapperRef.current.offsetWidth + 20);
    } else {
      setTimeout(() => {
        if (imageRef.current) {
          if (imageRef.current?.offsetHeight !== 0) {
            setHeight(imageRef.current?.offsetHeight + 20);
          }
        }
      }, 300);
    }
  };

  useEffect(() => {
    if (imageWidth && imageHeight && wrapperRef.current) {
      setHeight((imageHeight / imageWidth) * wrapperRef.current.offsetWidth + 20);
    } else if (imageRef.current && secondRender) {
      if (imageRef.current?.offsetHeight !== 0) {
        setHeight(imageRef.current?.offsetHeight + 20);
      }
    }
  }, [width]);

  useEffect(() => {
    setSecondRender(true);
    updateAsyncHeight();
  }, []);

  if (fullImage) {
    return (
      <div style={{ height, width: '100%' }} ref={wrapperRef}>
        <Collapse in={activate && height !== 'auto'}>
          <img ref={imageRef} {...others} alt={others.alt || ''} className={classes.fullImage} />
        </Collapse>
      </div>
    );
  }

  return (
    <button
      className={classes.button}
      type="button"
      onClick={() => setTimeout(() => openImageModal(), 100)}
    >
      <Figure
        {...others}
        style={{ backgroundColor: 'transparent', maxHeight: 320, ...style }}
        fluid={fluid}
        imgProps={{
          ...imgProps,
          style: {
            backgroundColor: 'transparent',
            maxHeight: 300,
            minWidth: 'unset',
            minHeight: 'unset',
          },
        }}
      />
    </button>
  );
}
