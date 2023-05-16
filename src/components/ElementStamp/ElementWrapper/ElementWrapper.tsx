import React, { SVGProps } from 'react';
import { Box, BoxProps, Center } from '@mantine/core';
import { Animated, Animator } from '@arwes/react';
import useStyles from './ElementWrapper.styles';

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
          <Animated<SVGPathElement, SVGProps<SVGPathElement>>
            animated={{
              initialStyle: { strokeDashoffset: 100 },
              transitions: {
                entering: { strokeDashoffset: 0 },
                exiting: { strokeDashoffset: 100 },
              },
            }}
            as="path"
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
