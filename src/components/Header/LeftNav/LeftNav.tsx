import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { aa, aaVisibility, Text, AnimatedProps, Animator } from '@arwes/react';
import { IconBlockquote } from '@tabler/icons-react';
import { MenuItem } from '@src/components/Header/MenuItem';
import { Menu } from '@src/components/Header/Menu';
import { mapLinks } from './mapNavLinks';
import useStyles from './LeftNav.styles';

interface LeftNavProps extends AnimatedProps {
  menu: { href: string; children: string; icon: string }[];
}

export function LeftNav({ menu }: LeftNavProps) {
  const { classes } = useStyles();
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
              >
                <Link href={link} title={label} passHref shallow>
                  {Icon && <Icon stroke={1} />}
                  <Text as="span" className={classes.menuText}>
                    {label}
                  </Text>
                </Link>
              </MenuItem>
            </Animator>
          ))}
          <Animator>
            <MenuItem
              className={classes.menuItem}
              active={router.asPath.startsWith('/restricted') as boolean}
              animated={leftItemAnimation}
            >
              <Link href="/restricted" title="restricted" passHref shallow>
                <IconBlockquote stroke={1} />
                <Text as="span" className={classes.menuText}>
                  Restricted
                </Text>
              </Link>
            </MenuItem>
          </Animator>
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
