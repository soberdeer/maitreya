import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { aa, aaVisibility, Animated, AnimatedProps, Animator } from '@arwes/react';
import { LeftNav } from '@src/components/Header/DesktopHeader/LeftNav';
import { Logo } from '@src/components/Header/Logo';
import { Box } from '@mantine/core';
import { RightNav } from '@src/components/Header/DesktopHeader/RightNav';
import { Illumination } from '@src/components/Illumination';
import useStyles from './DesktopHeader.styles';

interface HeaderProps extends AnimatedProps {
  menu: { href: string; children: string; icon: string }[];
  vkUrl?: string;
  isGuest?: boolean;
}

export function DesktopHeader({ className, menu, vkUrl, isGuest }: HeaderProps) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const active = useMemo(() => router.pathname !== '/login', [router]);

  return (
    <Animator active={active}>
      <Animated as="header" className={cx(classes.root, className)}>
        <Box className={classes.container}>
          <Illumination />
          <Box className={classes.left}>
            <Animator>
              <Logo animated={aaVisibility()} />
            </Animator>
          </Box>
          <Animated className={cx(classes.section, classes.left)} animated={aa('x', -12, 0)}>
            <LeftNav menu={menu} />
          </Animated>
          <div />
          {/*<Animated className={cx(classes.section, classes.center)} animated={aa('scaleX', 0.9, 1)}>*/}
          {/*  {center}*/}
          {/*</Animated>*/}
          <Animated className={cx(classes.section, classes.right)} animated={aa('x', 12, 0)}>
            <RightNav vkUrl={vkUrl} isGuest={isGuest} />
          </Animated>
        </Box>
      </Animated>
    </Animator>
  );
}
