import React from 'react';
import { aa, aaVisibility, AnimatedProps, Animator } from '@arwes/react';
import { IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { Box, Center } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { LogoutButton } from '@src/components/LogoutButton';
import { Menu } from '../Menu';
import { MenuItem } from '../../MenuItem';
import { VkIcon } from './VkIcon';
import { ActivateButton } from './ActivateButton';
import { SearchButton } from './SearchButton';
import useStyles from './RightNav.styles';

interface RightNavProps extends AnimatedProps {
  vkUrl?: string;
  isGuest?: boolean;
}

export function RightNav({ vkUrl, isGuest }: RightNavProps) {
  const { classes } = useStyles();
  const rightItemAnimation = [aaVisibility(), aa('x', 4, 0, 0)];
  const mobile = useMediaQuery('(max-width: 720px)');

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
              <Animator>
                <MenuItem className={classes.menuItem} animated={rightItemAnimation}>
                  <ActivateButton />
                </MenuItem>
              </Animator>
              {vkUrl && (
                <Animator>
                  <MenuItem className={classes.menuItem} animated={rightItemAnimation}>
                    <VkIcon href={vkUrl} />
                  </MenuItem>
                </Animator>
              )}
            </>
          )}

          <Animator>
            <MenuItem className={classes.menuItem} animated={rightItemAnimation}>
              {isGuest ? (
                <Box px={3}>
                  <LogoutButton iconSize={24} style={{ top: -3 }} />
                </Box>
              ) : (
                <Link href="/src/pages/user" title="Vkontakte" style={{ height: '100%' }} passHref>
                  <Center sx={{ height: '100%' }}>
                    <IconUser />
                  </Center>
                </Link>
              )}
            </MenuItem>
          </Animator>
        </Menu>
      </Animator>
    </Animator>
  );
}
