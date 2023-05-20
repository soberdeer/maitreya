import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { aa, aaVisibility, Animated, AnimatedProps, Animator } from '@arwes/react';
import { useViewportSize } from '@mantine/hooks';
import { Box } from '@mantine/core';
import { modals } from '@mantine/modals';
import { LeftNav } from '@src/components/Header/LeftNav';
import { Logo } from '@src/components/Header/Logo';
import { RightNav } from '@src/components/Header/RightNav';
import { Illumination } from '@src/components/Illumination';
import { MenuButton } from '@src/components/Header/MenuButton';
import { MenuModal } from '@src/components/Header/MenuModal';
import useStyles from './Header.styles';

interface HeaderProps extends AnimatedProps {
  menu: { href: string; children: string; icon: string }[];
  vkUrl?: string;
  isGuest?: boolean;
}

export function Header({ className, menu, vkUrl, isGuest }: HeaderProps) {
  const { classes, cx, theme } = useStyles();
  const router = useRouter();
  const active = useMemo(() => router.pathname !== '/login', [router]);
  const { width, height } = useViewportSize();

  const openMenu = () => {
    modals.open({
      fullScreen: true,
      transitionProps: { transition: 'slide-right' },
      withCloseButton: false,
      overlayProps: {
        color: theme.fn.darken(theme.colors.maitreya[9], 0.7),
        opacity: 0.8,
        blur: 3,
      },
      classNames: {
        content: classes.content,
      },
      children: (
        <MenuModal onClose={() => modals.closeAll()} menu={menu} vkUrl={vkUrl} isGuest={isGuest} />
      ),
    });
  };

  useEffect(() => modals.closeAll(), [width, height]);

  return (
    <Animator active={active}>
      <Animated as="header" className={cx(classes.root, className)}>
        <Box className={cx(classes.container, classes.desktop)}>
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
          <Animated className={cx(classes.section, classes.right)} animated={aa('x', 12, 0)}>
            <RightNav vkUrl={vkUrl} isGuest={isGuest} />
          </Animated>
        </Box>
        <Box className={cx(classes.container, classes.mobile)}>
          <Illumination />
          <Animated className={cx(classes.section, classes.left)} animated={aa('x', -12, 0)}>
            <MenuButton onClick={openMenu} />
          </Animated>
          <Animated className={cx(classes.section, classes.center)} animated={aa('x', -12, 0)}>
            <Animator>
              <Logo animated={aaVisibility()} />
            </Animator>
          </Animated>
          <Animated className={cx(classes.section, classes.right)} animated={aa('x', 12, 0)}>
            <RightNav vkUrl={vkUrl} isGuest={isGuest} />
          </Animated>
        </Box>
      </Animated>
    </Animator>
  );
}
