import React from 'react';
import {
  TextInput as MantineTextInput,
  TextInputProps as MantineTextInputProps,
} from '@mantine/core';
import { Animated, Animator } from '@arwes/react';
import useStyles from './TextInput.styles';

export interface TextInputProps extends Omit<MantineTextInputProps, 'classNames'> {}

export function TextInput(props: TextInputProps) {
  const { classes } = useStyles();
  return (
    <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
      <Animated
        animated={{
          transitions: {
            entering: { width: [0, '100%'] },
            exiting: { width: ['100%', 0] },
          },
        }}
        className={classes.animator}
      >
        <MantineTextInput classNames={classes} {...props} />
      </Animated>
    </Animator>
  );
}
