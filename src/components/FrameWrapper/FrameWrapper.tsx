import React, { useRef } from 'react';
import {
  FrameSVGLines,
  useFrameSVGAssemblingAnimation,
  Animator,
  aa,
  Animated,
  AnimatedProps,
} from '@arwes/react';
import { Box } from '@mantine/core';
import { Illumination } from '@src/components/Illumination';
import useStyles from './FrameWrapper.styles';

export interface FrameWrapperProps extends AnimatedProps {
  color?: string;
}

export function FrameWrapper({
  className,
  children,
  color = 'default',
  ...rest
}: FrameWrapperProps) {
  const { classes, cx } = useStyles();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);

  return (
    <Animated className={cx(classes.content, className)} animated={[aa('y', 24, 0)]} {...rest}>
      <Illumination />
      <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
        <FrameSVGLines
          className={cx(classes.root, classes[color as keyof typeof classes])}
          elementRef={svgRef}
          onRender={onRender}
          smallLineWidth={3}
        />
      </Animator>
      <Box pb={20}>{children}</Box>
    </Animated>
  );
}
