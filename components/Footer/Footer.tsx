import React, { useContext, useEffect, useState } from 'react';
import cx from 'clsx';
import { UnstyledButton, Center } from '@mantine/core';
import Container from '../Container/Container';
import FrameBox from '../arwes/FrameBox/FrameBox';
import VkIcon from '../icons/VkIcon';
import Anchor from '../Anchor/Anchor';
import PaletteContext from '../contexts/PaletteContext';
import useStyles from './Footer.styles';
import { Sun } from 'react-feather';

export interface FooterProps extends React.HTMLProps<HTMLElement> {
  vkUrl?: string;
}

export default function Footer({ className, vkUrl, ...others }: FooterProps) {
  const classes = useStyles();
  const { palette, setPalette } = useContext(PaletteContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);

    return () => {
      setShow(false);
    };
  }, []);

  if (!vkUrl) {
    return null;
  }

  return (
    <footer className={cx(classes.root, { [classes.activate]: show }, className)} {...others}>
      <div className={classes.background} />
      <FrameBox
        style={{ width: '100%' }}
        animator={{ activate: true, animate: false }}
        linesWidths={[2, 0, 0, 0]}
        className={classes.box}
      >
        <Container className={classes.container}>
          <UnstyledButton onClick={setPalette} mr="md">
            <Center>
              <Sun color={palette.text.root} />
            </Center>
          </UnstyledButton>
          <Anchor href={vkUrl} className={classes.link} target="_blank">
            <VkIcon />
          </Anchor>
        </Container>
      </FrameBox>
    </footer>
  );
}
