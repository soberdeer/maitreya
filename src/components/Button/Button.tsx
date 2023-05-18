import React, { JSX, useRef } from 'react';
import { UnstyledButtonProps, UnstyledButton, Group, Center, MantineColor } from '@mantine/core';
import { Animator, FrameSVGOctagon, Text, useFrameSVGAssemblingAnimation } from '@arwes/react';
import { DefaultType } from '@src/components/icons/default-type';
import useStyles from './Button.styles';

interface ButtonProps extends UnstyledButtonProps {
  color?: MantineColor;
  leftIcon?: (props: DefaultType) => JSX.Element;
  rightIcon?: (props: DefaultType) => JSX.Element;
  children?: string;

  onClick(): void;
}

export function Button({
  onClick,
  children,
  color = 'yellow',
  rightIcon: RightIcon,
  leftIcon: LeftIcon,
  ...rest
}: ButtonProps) {
  const { classes } = useStyles({ color });
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);

  return (
    <UnstyledButton onClick={onClick} className={classes.button} {...rest}>
      <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
        <FrameSVGOctagon
          elementRef={svgRef}
          onRender={onRender}
          padding={4}
          leftBottom={false}
          rightTop={false}
          strokeWidth={0.5}
          className={classes.box}
        />
        <Center sx={{ height: '100%' }} className={classes.text}>
          <Group spacing="xs" px={30} py={15}>
            {LeftIcon && <LeftIcon size={24} />}
            <Text as="span">{children}</Text>
            {RightIcon && <RightIcon size={24} />}
          </Group>
        </Center>
        {/*</FrameSVGOctagon>*/}
      </Animator>
    </UnstyledButton>
  );
}
