import React, { useMemo } from 'react';
import cx from 'clsx';
import colors from '../../../styles/colors';
import Text, { TextProps } from '../Text/Text';
import AnimatedIcon from '../../AnimatedIcon/AnimatedIcon';
import useStyles from './TextWithIcon.styles';
import Tooltip from '../../Tooltip/Tooltip';

export interface TextWithIconProps extends TextProps {
  palette?: keyof typeof colors;
  noShadow?: boolean;
  styledFont?: boolean;
  icon?: unknown;
  right?: boolean;
  iconProps?: any;
  tooltip?: string;
  mainProps?: React.HTMLProps<HTMLDivElement>;
  wrapperProps?: React.HTMLProps<HTMLDivElement>;
  iconWrapperProps?: React.HTMLProps<HTMLDivElement>;
}

export default function TextWithIcon({
  className,
  palette = 'primary',
  icon: Icon,
  iconProps,
  children,
  withHover = false,
  right = false,
  tooltip,
  mainProps = {},
  wrapperProps = {},
  iconWrapperProps = {},
  ...others
}: TextWithIconProps) {
  const classes = useStyles({ palette });
  const Component = tooltip ? Tooltip : 'div';
  const width = useMemo(() => iconProps.size || iconProps.width || 20, [iconProps]);
  const height = useMemo(() => iconProps.size || iconProps.height || 20, [iconProps]);

  return (
    <div
      className={cx(classes.root, className, mainProps.className || '', {
        [classes.right]: right,
        [classes.hover]: withHover,
      })}
      {...mainProps}
    >
      <Component content={tooltip} {...wrapperProps}>
        {Icon && (
          <AnimatedIcon width={width} height={height}>
            <div style={{ width, height }} {...iconWrapperProps}>
              <Icon {...iconProps} className={classes.icon} />
            </div>
          </AnimatedIcon>
        )}
      </Component>
      <Text className={classes.text} {...others}>
        {children}
      </Text>
    </div>
  );
}
