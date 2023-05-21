import React, { forwardRef } from 'react';
import { Animated, AnimatedProps } from '@arwes/react';
import { Center, UnstyledButton } from '@mantine/core';
import { useAnimate } from '@src/hooks/use-animate';
import useStyles from './ActivateButton.styles';

interface ActivateButtonProps extends AnimatedProps {
  size?: number | string;
}

export const ActivateButton = forwardRef<HTMLDivElement, ActivateButtonProps>(
  ({ className, animated, size = 24, ...rest }, ref) => {
    const { classes, cx } = useStyles();
    const { animate, toggleAnimate } = useAnimate();

    return (
      <Animated className={cx(classes.root, className)} ref={ref} {...rest}>
        <UnstyledButton sx={{ height: '100%' }} onClick={() => toggleAnimate()}>
          <Center sx={{ height: '100%' }}>
            <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" height={size} width={size}>
              <path
                d="M23.11,17.57,25.67,7.33,31.17,22H38.5"
                className={cx(classes.line, classes.iconLine)}
              />
              <path
                d="M5.5,22h7.33l5.5,14.67L22,22"
                className={cx(classes.line, classes.iconLine)}
              />
              <g>
                <path
                  d="M7.33,7.33,36.67,36.67"
                  className={cx(classes.line, classes.hiddenLine, {
                    [classes.strikethrough]: !animate,
                  })}
                />
                <path
                  d="M23.11 17.57, L22 22"
                  className={cx(classes.line, { [classes.connect]: !animate })}
                />
              </g>
            </svg>
          </Center>
        </UnstyledButton>
      </Animated>
    );
  }
);
