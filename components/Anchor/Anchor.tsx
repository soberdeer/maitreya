// @ts-nocheck
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Text } from '../arwes';
import ActivateContext from '../contexts/ActivateContext';
import PaletteContext from '../contexts/PaletteContext';

export interface AnchorProps extends React.HTMLProps<HTMLAnchorElement> {
  animator?: any;
  palette?: string;
  styledFont?: boolean;
  withHover?: boolean;
}

export default function Anchor({
  href,
  animator,
  palette,
  children,
  styledFont,
  withHover,
  style,
  ...props
}: AnchorProps) {
  const [activate, setActivate] = useState(false);
  const { activate: routerActivate, setActivate: setRouterActivate } = useContext(ActivateContext);

  useEffect(() => {
    if (routerActivate) {
      setActivate(true);
    }
    return () => {
      setActivate(false);
    };
  }, []);

  return (
    <Link href={href || ''} passHref>
      <a
        {...props}
        style={{ cursor: 'pointer', ...style }}
        onClick={(e) => {
          if (props.onClick) {
            props.onClick(e);
          }
          setRouterActivate(false);
          return true;
        }}
      >
        {typeof children === 'string' ? (
          <Text
            animator={animator || { activate }}
            as="span"
            palette={palette}
            styledFont={styledFont}
            withHover
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </a>
    </Link>
  );
}
