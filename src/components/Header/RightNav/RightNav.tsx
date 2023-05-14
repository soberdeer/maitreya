import React from 'react';
import { aa, aaVisibility, AnimatedProps, Animator } from '@arwes/react';
import { VkIcon } from '@src/components/Header/RightNav/VkIcon';
import { ActivateButton } from '@src/components/Header/RightNav/ActivateButton';
import { Menu } from '@src/components/Header/Menu';
import { MenuItem } from '@src/components/Header/MenuItem';
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
        </Menu>
      </Animator>
    </Animator>
  );
}
