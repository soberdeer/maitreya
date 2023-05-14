import React, { useRef } from 'react';
import {
  FrameSVGLines,
  useFrameSVGAssemblingAnimation,
  Animator,
  aa,
  Animated,
} from '@arwes/react';
import useStyles from './FrameWrapper.styles';

export function FrameWrapper({
  children,
  color = 'default',
}: {
  children?: React.ReactNode;
  color?: string;
}) {
  const { classes, cx } = useStyles();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);

  return (
    <Animated as="main" className={classes.content} animated={[aa('y', 24, 0)]}>
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
