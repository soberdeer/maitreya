import React from 'react';
import { Animator, Animated } from '@arwes/react';
import { Illumination } from '@src/components/Illumination';
import { Box, BoxProps } from '@mantine/core';
import useStyles from './Frame.styles';

interface FrameWrapperProps extends BoxProps {
  color?: string;
}

const transitionStyles = {
  borderLeft: {
    entering: { height: [0, '100%'] },
    exiting: { height: ['100%', 0] },
  },
  borderRight: {
    entering: { height: [0, '100%'] },
    exiting: { height: ['100%', 0] },
  },
  borderTop: {
    entering: { width: [0, '100%'] },
    exiting: { width: ['100%', 0] },
  },
  borderBottom: {
    entering: { width: [0, '100%'] },
    exiting: { width: ['100%', 0] },
  },
};

export function Frame({ className, children, ...rest }: FrameWrapperProps) {
  const { classes, cx, theme } = useStyles();

  return (
    <Box className={cx(classes.root, className)} {...rest}>
      <Illumination />
      <Animator merge duration={{ enter: 0.4, exit: 0.4, delay: 1 }}>
        {Object.keys(transitionStyles).map((cl) => (
          <Animated
            key={cl}
            animated={{
              transitions: transitionStyles[cl as keyof typeof transitionStyles],
            }}
            className={cx(classes.border, classes[cl as keyof typeof classes])}
          />
        ))}
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
          <div className={classes.children}>{children}</div>
        </Animated>
      </Animator>
    </Box>
  );
}
