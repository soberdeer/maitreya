import React, { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Animator, Puffs, PuffsProps } from '@arwes/react';
import { Box } from '@mantine/core';
import { Blurhash } from 'react-blurhash';
import useStyles from './Background.styles';

const BLURHASH = 'L201;-f+dCe9enenf6gNdCeThegh';

interface PuffsAnimationProps extends PuffsProps {
  interval: number;
}

const PuffsAnimation = ({ interval, ...rest }: PuffsAnimationProps) => (
  <Animator
    duration={{
      interval,
    }}
  >
    <Puffs padding={0} xOffset={[0, 0]} yOffset={[0, 0]} {...rest} />
  </Animator>
);

export function Background() {
  const { classes, theme, cx } = useStyles();
  const router = useRouter();
  const red = useMemo(() => router.pathname === '/restricted', [router.pathname]);

  return (
    <Box className={classes.root}>
      <PuffsAnimation
        interval={30}
        className={classes.front}
        color={theme.colors.maitreya[3]}
        quantity={10}
        radiusOffset={[1, 10]}
        sets={1}
      />
      <PuffsAnimation
        interval={10}
        className={classes.front}
        color="white"
        quantity={50}
        radiusOffset={[1, 1]}
        sets={2}
      />
      <PuffsAnimation
        interval={20}
        className={classes.front}
        color={theme.colors.yellow[3]}
        quantity={10}
        radiusOffset={[2, 4]}
        sets={1}
      />
      <Box className={classes.overlay} />
      <Blurhash hash={BLURHASH} width="100vw" height="100vh" className={classes.back} />
      <Image
        className={cx(classes.backgroundImage, { [classes.redImage]: red })}
        src="https://images.ctfassets.net/riwkbfr61vnb/6uzlAvYorN1Mug2gDzdNV4/9ddfaf92ae67487ebdb1310f31768509/background-large.webp"
        alt="background"
        fill
      />
    </Box>
  );
}
