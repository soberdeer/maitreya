import React from 'react';
import Link from 'next/link';
import { Animator, AnimatorProps } from '@arwes/react';
import { MantineColor } from '@mantine/core';
import useStyles from './Anchor.styles';

interface AnchorProps extends AnimatorProps {
  href: string;
  color?: MantineColor;
  styled?: boolean;
  target?: string;
}

export function Anchor({
  href,
  color = 'maitreya',
  styled,
  children,
  target,
  ...rest
}: AnchorProps) {
  const { classes, theme, cx } = useStyles();

  return (
    <Animator {...rest}>
      <Link
        href={href}
        passHref
        shallow
        target={target}
        className={cx({ [classes.styled]: styled })}
        style={{
          color: theme.colors[color][color === 'maitreyaSecondary' ? 5 : 3],
          textShadow: `0 0 1px ${theme.colors[color][color === 'maitreyaSecondary' ? 5 : 3]}`,
        }}
      >
        {children}
      </Link>
    </Animator>
  );
}
