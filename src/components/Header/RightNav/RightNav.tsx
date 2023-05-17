import React from 'react';
import { aa, aaVisibility, AnimatedProps, Animator } from '@arwes/react';
import { IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { Center } from '@mantine/core';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { VkIcon } from './VkIcon';
import { ActivateButton } from './ActivateButton';
import { SearchButton } from './SearchButton';
import useStyles from './RightNav.styles';

interface RightNavProps extends AnimatedProps {
  vkUrl?: string;
}

export function RightNav({ vkUrl }: RightNavProps) {
  const { classes } = useStyles();
  const rightItemAnimation = [aaVisibility(), aa('x', 4, 0, 0)];

  return (
    <Animator combine manager="stagger">
      <Animator combine manager="stagger" duration={{ stagger: 0.03 }}>
        <Menu>
          <Animator>
            <MenuItem className={classes.menuItem} animated={rightItemAnimation}>
              <SearchButton />
            </MenuItem>
          </Animator>
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
          <Animator>
            <MenuItem className={classes.menuItem} animated={rightItemAnimation}>
              <Link href="/user" title="Vkontakte" style={{ height: '100%' }} passHref>
                <Center sx={{ height: '100%' }}>
                  <IconUser />
                </Center>
              </Link>
            </MenuItem>
          </Animator>
        </Menu>
      </Animator>
    </Animator>
  );
}
