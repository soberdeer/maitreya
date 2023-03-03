import React, { useContext, useEffect, useRef, useState } from 'react';
import cx from 'clsx';
import { Asset } from 'contentful';
import { useViewportSize } from '@mantine/hooks';
import { User, Menu } from 'react-feather';
import colors from '../../styles/colors';
import FrameBox from '../arwes/FrameBox/FrameBox';
import Anchor from '../Anchor/Anchor';
import Container from '../Container/Container';
import MobileModal from './MobileModal';
import LogoutButton from '../LogoutButton/LogoutButton';
import useStyles from './Header.styles';
import { openModal } from '../../util/openModal';
import { closeAllModals } from '@mantine/modals';
import PaletteContext from '../contexts/PaletteContext';

const anchors = [
  {
    href: '/technics',
    children: 'Техники',
  },
  {
    href: '/user',
    children: 'Профиль',
  },
];

export interface HeaderProps extends React.HTMLProps<HTMLElement> {
  isGuest: boolean;
  menu?: { href?: string; children?: string }[];
  vk_url?: string;
  logo: Asset;
}

export default function Header({ className, children, isGuest, menu, vk_url, logo }: HeaderProps) {
  const classes = useStyles();
  const { palette } = useContext(PaletteContext);
  const { width } = useViewportSize();
  const [show, setShow] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    closeAllModals();
  }, [width]);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);

  return (
    <header className={cx(classes.root, { [classes.activate]: show }, className)} ref={elementRef}>
      <div className={classes.background} />
      <FrameBox
        style={{ width: '100%' }}
        animator={{ activate: true, animate: false }}
        linesWidths={[0, 0, 2, 0]}
        className={classes.box}
      >
        <Container
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div className={classes.logo}>
            <Anchor href="/">
              <img height={40} src={logo?.fields.file.url} alt="Лого" />
            </Anchor>
          </div>
          <div className={classes.content}>
            {children}
            {[...(menu || []), ...anchors].map((item, index) =>
              item.href === '/user' ? (
                !isGuest ? (
                  <Anchor
                    className={classes.link}
                    href="/user"
                    palette="secondary"
                    key={index}
                    withHover
                  >
                    <User size={20} color={palette.secondary.main} />
                  </Anchor>
                ) : (
                  <LogoutButton key={index} />
                )
              ) : item.href ? (
                <Anchor
                  key={index}
                  withHover
                  className={classes.link}
                  animator={{ activate: true, animate: false }}
                  palette="secondary"
                  {...item}
                />
              ) : null
            )}
          </div>
          <div className={classes.mobileContent}>
            <button
              type="button"
              className={classes.burgerButton}
              onClick={() =>
                openModal({
                  children: (
                    <MobileModal anchors={[...menu, ...anchors]} vkUrl={vk_url} isGuest={isGuest} />
                  ),
                  fullScreen: width < 720,
                })
              }
            >
              <div className={classes.link}>
                <Menu size={30} color={colors.secondary} />
              </div>
            </button>
          </div>
        </Container>
      </FrameBox>
    </header>
  );
}
