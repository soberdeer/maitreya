import React, { useMemo } from 'react';
import { aa, Animator, Text } from '@arwes/react';
import { Menu } from '@src/components/Header/Menu';
import { MenuItem } from '@src/components/Header/MenuItem';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LoginIcon, UserIcon, XIcon } from '@src/components/icons';
import { Box, UnstyledButton } from '@mantine/core';
// import { ActivateButton } from '@src/components/Header/RightNav/ActivateButton';
import { VkIcon } from '@src/components/Header/RightNav/VkIcon';
import { mapLinks } from '../LeftNav';
import useStyles from './MenuModal.styles';

interface MenuModalProps {
  menu: { href: string; children: string; icon: string }[];

  onClose(): void;

  vkUrl?: string;
  isGuest?: boolean;
}

export function MenuModal({ onClose, menu, vkUrl, isGuest }: MenuModalProps) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const links = useMemo(() => mapLinks(menu), [menu]);

  return (
    <Animator combine manager="stagger">
      <Animator combine manager="stagger" duration={{ stagger: 0.03 }}>
        <MenuItem as="div" className={cx(classes.menuItem, classes.block)}>
          <UnstyledButton onClick={onClose}>
            <XIcon size={24} className={classes.menuText} />
          </UnstyledButton>
        </MenuItem>
        <Menu vertical>
          {links.map(({ icon: Icon, link, label }, index) => (
            <MenuItem
              key={index}
              className={classes.menuItem}
              active={router.asPath.startsWith(link) as boolean}
              animated={aa('x', -12, 0)}
            >
              <Link href={link} title={label} passHref onClick={onClose}>
                {Icon && <Icon size={30} />}
                <Text as="span" className={classes.menuText}>
                  {label}
                </Text>
              </Link>
            </MenuItem>
          ))}
          {!isGuest && (
            <MenuItem
              className={classes.menuItem}
              active={router.asPath.startsWith('/user') as boolean}
              animated={aa('x', -12, 0)}
            >
              <Link href="/user" title="Профиль" passHref onClick={onClose}>
                <UserIcon size={30} />
                <Text as="span" className={classes.menuText}>
                  Профиль
                </Text>
              </Link>
            </MenuItem>
          )}
        </Menu>
        <Box pt="1rem" pl={3}>
          <Menu style={{ justifyContent: 'flex-start' }}>
            {/*<MenuItem className={classes.menuItem} animated={aa('x', -12, 0)}>*/}
            {/*  <ActivateButton size={30} />*/}
            {/*</MenuItem>*/}
            {vkUrl && (
              <MenuItem className={classes.menuItem} animated={aa('x', -12, 0)}>
                <VkIcon href={vkUrl} size={30} />
              </MenuItem>
            )}
            {isGuest && (
              <MenuItem className={classes.menuItem} animated={aa('x', -12, 0)}>
                <Link href="/login" title="Войти" passHref onClick={onClose}>
                  <LoginIcon size={30} />
                </Link>
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Animator>
    </Animator>
  );
}
