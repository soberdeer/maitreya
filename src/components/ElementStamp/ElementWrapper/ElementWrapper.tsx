import React from 'react';
import { Box, BoxProps, Center } from '@mantine/core';
import useStyles from './ElementWrapper.styles';
import { Animated, Animator } from '@arwes/react';

interface ElementWrapperProps extends BoxProps {
  color: string;
}

export function ElementWrapper({ className, color, children, ...rest }: ElementWrapperProps) {
  const { classes, cx } = useStyles();

  return (
    <Animator duration={{ enter: 0.4, exit: 0.4 }}>
      <Box className={cx(classes.root, className)} {...rest}>
        <Center sx={{ height: '100%' }}>{children}</Center>
        <svg className={classes.circleSvg} viewBox="0 0 26 26" width={26} height={26}>
          <Animated
            animated={{
              transitions: {
                enter: {
                  strokeDashoffset: [0, 100],
                },
                exit: {
                  strokeDashoffset: [100, 0],
                },
              },
            }}
            as="path"
            //@ts-ignore
            d="M1.07 12.99A11.93 11.93 0 1013 1.06 11.93 11.93 0 001.07 12.99"
            fill="none"
            stroke={color}
            strokeWidth={2}
            className={classes.circle}
          />
        </svg>
      </Box>
    </Animator>
  );
}
