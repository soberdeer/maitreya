import React from 'react';
import { AnimatedProps } from '@arwes/react';
// import { Box } from '@mantine/core';
import { DesktopHeader } from '@src/components/Header/DesktopHeader';
// import { MobileHeader } from '@src/components/Header/MobileHeader';
// import useStyles from './Header.styles';

interface HeaderProps extends AnimatedProps {
  menu: { href: string; children: string; icon: string }[];
  vkUrl?: string;
  isGuest?: boolean;
}

export function Header(props: HeaderProps) {
  // const { classes } = useStyles();

  return (
    <>
      {/*<Box className={classes.desktop}>*/}
      <DesktopHeader {...props} />
      {/*</Box>*/}
      {/*<Box className={classes.mobile}>*/}
      {/*  <MobileHeader {...props} />*/}
      {/*</Box>*/}
    </>
  );
}
