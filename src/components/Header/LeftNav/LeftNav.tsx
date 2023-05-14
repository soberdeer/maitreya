import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { aa, aaVisibility, Text, AnimatedProps, Animator } from '@arwes/react';
import { MenuItem } from '@src/components/Header/MenuItem';
import { Menu } from '@src/components/Header/Menu';
import { Logo } from '@src/components/Header/Logo';
import { mapLinks } from './mapNavLinks';
import useStyles from './LeftNav.styles';

interface HeaderProps extends AnimatedProps {
  menu: { href: string; children: string; icon: string }[];
}

export function LeftNav({ menu }: HeaderProps) {
  const { classes } = useStyles();
  const router = useRouter();
  const links = useMemo(() => mapLinks(menu), [menu]);
  const leftItemAnimation = [aaVisibility(), aa('x', -4, 0, 0)];

  return (
    <Animator combine manager="stagger">
      <Animator>
        <Logo animated={aaVisibility()}>
          {/*<Animator merge>*/}
          {/*  <LogoType className={hiddenSMDown} animated={leftItemAnimation} />*/}
          {/*</Animator>*/}
        </Logo>
      </Animator>
      <Animator combine manager="stagger" duration={{ stagger: 0.03 }}>
        <Menu>
          {links.map(({ icon: Icon, link, label }, index) => (
            <Animator key={index}>
              <MenuItem
                className={classes.menuItem}
                active={router.asPath.startsWith(link) as boolean}
                animated={leftItemAnimation}
              >
                <Link href={link} title={label}>
                  {Icon && <Icon stroke={1} />}
                  <Text as="span" className={classes.menuText}>
                    {label}
                  </Text>
                </Link>
              </MenuItem>
            </Animator>
          ))}
          {/*<Link href="/restricted" >*/}
          {/*  <Text as="span" className={classes.menuText}>*/}
          {/*    restricted*/}
          {/*  </Text>*/}
          {/*</Link>*/}
        </Menu>
      </Animator>
    </Animator>
  );
}
