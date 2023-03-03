import React from 'react';
import { Award } from 'react-feather';
import AnimatedIcon from '../../AnimatedIcon/AnimatedIcon';

export interface StandardIconProps extends React.HTMLProps<HTMLDivElement> {
  size?: number;
  tooltip?: string;
  color?: string;
}

export default function StandardIcon({
  size = 26,
  tooltip,
  color = '#FFD43B',
  style,
  ...others
}: StandardIconProps) {
  return (
    <div style={{ width: size, ...style }} {...others}>
      <AnimatedIcon width={size} tooltip={tooltip}>
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: size,
            minWidth: size,
          }}
        >
          <Award size={size} color={color} />
        </div>
      </AnimatedIcon>
    </div>
  );
}
