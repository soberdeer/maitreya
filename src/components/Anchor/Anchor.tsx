import React from 'react';
import Link from 'next/link';
import { Animator, AnimatorProps } from '@arwes/react';
import { MantineColor } from '@mantine/core';
import useStyles from './Anchor.styles';

export interface AnchorProps extends AnimatorProps {
  href: string;
  color?: MantineColor;
  styled?: boolean;
  target?: string;
  noShadow?: boolean;
  noShallow?: boolean;
}

export function Anchor({
  href,
  color = 'maitreya',
  styled,
  children,
  target,
  noShadow,
  noShallow = false,
}: AnchorProps) {
  const { classes, cx } = useStyles({ color, noShadow });

  return (
    <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
      <Link
        href={href}
        passHref
        shallow={!noShallow}
        target={target}
        className={cx(classes.anchor, { [classes.styled]: styled })}
      >
        {children}
      </Link>
    </Animator>
  );
}
