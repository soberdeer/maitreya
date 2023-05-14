import React, { useRef } from 'react';
import {
  FrameSVGLines,
  useFrameSVGAssemblingAnimation,
  Animator,
  aa,
  Animated,
  AnimatedProps,
} from '@arwes/react';
import useStyles from './FrameWrapper.styles';

interface FrameWrapperProps extends AnimatedProps {
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
    <Animated
      className={cx(classes.content, className)}
      animated={[aa('y', 24, 0)]}
      {...rest}
    >
      <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
        <FrameSVGLines
          className={cx(classes.root, classes[color as keyof typeof classes])}
          elementRef={svgRef}
          onRender={onRender}
          smallLineWidth={3}
        />
      </Animator>
      {children}
    </Animated>
  );
}
