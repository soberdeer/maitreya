import React, { useEffect, useState } from 'react';
import { Figure, FigureProps } from '../arwes';
import useStyles from './Image.styles';
import { useActivate } from '../../hooks/use-activate';

export default function ModalContent({ fluid, imgProps, children, style, ...others }: FigureProps) {
  const classes = useStyles();
  const [exiting, setExiting] = useState(false);
  const { activate, setActivate } = useActivate();

  useEffect(() => {
    if (exiting) {
      setActivate(false);
      setTimeout(() => setExiting(false), 400);
    }
  }, [exiting]);

  return (
    <Figure
      {...others}
      style={{ backgroundColor: 'transparent', minWidth: 'unset', ...style }}
      fluid={fluid}
      imgProps={{
        ...imgProps,
        style: {
          backgroundColor: 'transparent',
          minWidth: 'unset',
          minHeight: 'unset',
          maxHeight: 'calc(100vh - 150px)',
        },
      }}
      animator={{ activate, duration: { enter: 200, exit: 200 } }}
    >
      {children}
    </Figure>
  );
}
