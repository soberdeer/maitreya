import React, { useRef } from 'react';
import { UnstyledButtonProps, UnstyledButton, Group, Center, MantineColor } from '@mantine/core';
import { Animator, FrameSVGOctagon, Text, useFrameSVGAssemblingAnimation } from '@arwes/react';
import { Illumination } from '@src/components/Illumination';
import useStyles from './Button.styles';

interface ButtonProps extends UnstyledButtonProps {
  onClick(): void;

  color?: MantineColor;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: string;
}

export function Button({ onClick, children, color = 'yellow', ...rest }: ButtonProps) {
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
        <Center sx={{ height: '100%' }}>
          <Group spacing="xs" px={30} py={15}>
            <Text as="span" className={classes.text}>
              {children}
            </Text>
          </Group>
        </Center>
        {/*</FrameSVGOctagon>*/}
      </Animator>
    </UnstyledButton>
  );
}
