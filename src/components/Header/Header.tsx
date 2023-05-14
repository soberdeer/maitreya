import React from 'react';
import { aa, aaVisibility, Animated, AnimatedProps, Animator, Illuminator } from '@arwes/react';
import { LeftNav } from '@src/components/Header/LeftNav';
import { Logo } from '@src/components/Header/Logo';
import { Box } from '@mantine/core';
import { RightNav } from '@src/components/Header/RightNav';
import useStyles from './Header.styles';

interface HeaderProps extends AnimatedProps {
  menu: { href: string; children: string; icon: string }[];
  vkUrl?: string;
}

export function Header({ className, menu, vkUrl }: HeaderProps) {
  const { classes, cx } = useStyles();

  return (
    <Animated as="header" className={cx(classes.root, className)}>
      <Box className={classes.container}>
        <Box role="presentation" className={classes.frame}>
          <Illuminator color="hsl(180 50% 50% / 10%)" size={400} />
        </Box>
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
          <RightNav vkUrl={vkUrl} />
        </Animated>
      </Box>
    </Animated>
  );
}
