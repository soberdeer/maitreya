import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { aa, aaVisibility, Text, AnimatedProps, Animator } from '@arwes/react';
import { MenuItem } from '@src/components/Header/MenuItem';
import { Menu } from '@src/components/Header/Menu';
import { useMediaQuery } from '@mantine/hooks';
import { mapLinks } from './mapNavLinks';
import useStyles from './LeftNav.styles';

interface LeftNavProps extends AnimatedProps {
  menu: { href: string; children: string; icon: string }[];
}

export function LeftNav({ menu }: LeftNavProps) {
  const { classes } = useStyles();
  const disabled = useMediaQuery('(min-width: 720px)');
  const router = useRouter();
  const links = useMemo(() => mapLinks(menu), [menu]);
  const leftItemAnimation = [aaVisibility(), aa('x', -4, 0, 0)];

  return (
    <Animator combine manager="stagger">
      <Animator combine manager="stagger" duration={{ stagger: 0.03 }}>
        <Menu>
          {links.map(({ icon: Icon, link, label }, index) => (
            <Animator key={index}>
              <MenuItem
                className={classes.menuItem}
                active={router.asPath.startsWith(link) as boolean}
                animated={leftItemAnimation}
                tooltip={disabled ? undefined : label}
              >
                <Link href={link} title={label} passHref>
                  {Icon && <Icon />}
                  <Text as="span" className={classes.menuText}>
                    {label}
                  </Text>
                </Link>
              </MenuItem>
            </Animator>
          ))}
        </Menu>
      </Animator>
    </Animator>
  );
}
