import React from 'react';
import { aa, Animated, AnimatedProps, Illuminator } from '@arwes/react';
import { LeftNav } from '@src/components/Header/LeftNav';
import useStyles from './Header.styles';

interface HeaderProps extends AnimatedProps {
  menu: { href: string; children: string; icon: string }[];
}

export function Header({ className, menu }: HeaderProps) {
  const { classes, cx } = useStyles();

  return (
    <Animated as="header" className={cx(classes.root, className)}>
      <div className={classes.container}>
        <div role="presentation" className={classes.frame}>
          <Illuminator color="hsl(180 50% 50% / 10%)" size={400} />
        </div>
        <Animated className={cx(classes.section, classes.left)} animated={aa('x', -12, 0)}>
          <LeftNav menu={menu} />
        </Animated>
        {/*<Animated className={cx(classes.section, classes.center)} animated={aa('scaleX', 0.9, 1)}>*/}
        {/*  {center}*/}
        {/*</Animated>*/}
        {/*<Animated className={cx(classes.section, classes.right)} animated={aa('x', 12, 0)}>*/}
        {/*  {right}*/}
        {/*</Animated>*/}
      </div>
    </Animated>
  );
}
