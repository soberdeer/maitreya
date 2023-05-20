import React from 'react';
import { aa, aaVisibility, Animator } from '@arwes/react';
import { Menu } from '@src/components/Header/Menu';
import { UnstyledButton } from '@mantine/core';
import { MenuIcon } from '@src/components/icons';
import { MenuItem } from '@src/components/Header/MenuItem';

interface MenuItemProps {
  onClick(): void;
}

export function MenuButton({ onClick }: MenuItemProps) {
  return (
    <Animator combine manager="stagger">
      <Animator combine manager="stagger" duration={{ stagger: 0.03 }}>
        <Menu>
          <Animator>
            <MenuItem animated={[aaVisibility(), aa('x', -4, 0, 0)]}>
              <UnstyledButton onClick={onClick}>
                <MenuIcon />
              </UnstyledButton>
            </MenuItem>
          </Animator>
        </Menu>
      </Animator>
    </Animator>
  );
}
