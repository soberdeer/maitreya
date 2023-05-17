import React from 'react';
import { Animator, Animated } from '@arwes/react';
import { Box, BoxProps } from '@mantine/core';
import useStyles from './Blockquote.styles';

interface FrameWrapperProps extends BoxProps {
  color?: string;
}

export function Blockquote({ className, children, ...rest }: FrameWrapperProps) {
  const { classes, cx, theme } = useStyles();

  return (
    <Box className={cx(classes.root, className)} {...rest}>
      <Animator merge duration={{ enter: 0.4, exit: 0.4, delay: 0.1 }}>
        <Animated
          animated={{
            transitions: {
              entering: { height: [0, '100%'] },
              exiting: { height: ['100%', 0] },
            },
          }}
          className={classes.borderLeft}
        />
        <Animated
          animated={{
            transitions: {
              enter: {
                backgroundColor: ['transparent', theme.fn.rgba(theme.colors.maitreya[9], 0.4)],
              },
              exit: {
                backgroundColor: [theme.fn.rgba(theme.colors.maitreya[9], 0.4), 'transparent'],
              },
            },
          }}
          className={classes.box}
        >
          <blockquote className={classes.children}>{children}</blockquote>
        </Animated>
      </Animator>
    </Box>
  );
}
