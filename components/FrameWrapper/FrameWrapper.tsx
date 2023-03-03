import React from 'react';
import cx from 'clsx';
import { useActivate } from '../../hooks/use-activate';
import FrameBox, { FrameBoxProps } from '../arwes/FrameBox/FrameBox';
import useStyles from './FrameWrapper.styles';
import { AnimatorInstanceSettings } from '@arwes/animation';

export interface FrameWrapperProps extends React.HTMLProps<HTMLDivElement> {
  flex?: boolean;
  noHeader?: boolean;
  autoWidth?: boolean;
  animator?: AnimatorInstanceSettings;
  manager?: 'parallel' | 'sequence' | 'stagger';
  component?: React.ReactNode;
  autoHeight?: boolean;
  frameBoxProps?: FrameBoxProps;
}

export default function FrameWrapper({
  className,
  children,
  animator,
  flex = false,
  noHeader,
  autoWidth,
  autoHeight,
  component: Component = FrameBox,
  manager = 'stagger',
  frameBoxProps = {},
  ...others
}: FrameWrapperProps) {
  const classes = useStyles({ noHeader, autoWidth, autoHeight });
  const { activate } = useActivate();

  return (
    <div className={cx({ [classes.flex]: flex }, className)} {...others}>
      <Component
        animator={animator || { activate, duration: 200, manager }}
        className={classes.root}
        {...frameBoxProps}
      >
        <div>{children}</div>
      </Component>
    </div>
  );
}
