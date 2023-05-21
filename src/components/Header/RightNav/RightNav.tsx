import React from 'react';
import { aa, aaVisibility, AnimatedProps, Animator } from '@arwes/react';
import Link from 'next/link';
import { Center, em, getBreakpointValue } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { LoginIcon, UserIcon } from '@src/components/icons';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { VkIcon } from './VkIcon';
import { SearchButton } from './SearchButton';
import useStyles from './RightNav.styles';

interface RightNavProps extends AnimatedProps {
  vkUrl?: string;
  isGuest?: boolean;
}

export function RightNav({ vkUrl, isGuest }: RightNavProps) {
  const { classes, theme } = useStyles();
  const rightItemAnimation = [aaVisibility(), aa('x', 4, 0, 0)];
  const mobile = useMediaQuery(`(max-width: ${em(getBreakpointValue(theme.breakpoints.sm))})`);

  return (
    <Animator combine manager="stagger">
      <Animator combine manager="stagger" duration={{ stagger: 0.03 }}>
        <Menu>
          <Animator>
            <MenuItem className={classes.menuItem} animated={rightItemAnimation}>
              <SearchButton />
            </MenuItem>
          </Animator>
          {!mobile && (
            <>
              {vkUrl && (
                <Animator>
                  <MenuItem className={classes.menuItem} animated={rightItemAnimation}>
                    <VkIcon href={vkUrl} />
                  </MenuItem>
                </Animator>
              )}
              <Animator>
                <MenuItem
                  className={classes.menuItem}
                  animated={rightItemAnimation}
                  tooltip={isGuest ? 'Войти' : undefined}
                >
                  {isGuest ? (
                    <Link href="/user" title="Vkontakte" style={{ height: '100%' }} passHref>
                      <Center sx={{ height: '100%' }}>
                        <LoginIcon />
                      </Center>
                    </Link>
                  ) : (
                    <Link href="/user" title="Vkontakte" style={{ height: '100%' }} passHref>
                      <Center sx={{ height: '100%' }}>
                        <UserIcon />
                      </Center>
                    </Link>
                  )}
                </MenuItem>
              </Animator>
            </>
          )}
        </Menu>
      </Animator>
    </Animator>
  );
}
