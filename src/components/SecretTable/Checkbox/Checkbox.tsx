import React from 'react';
import {
  Checkbox as MantineCheckbox,
  CheckboxProps,
  CheckboxProps as MantineCheckboxProps,
} from '@mantine/core';
import { IconMinus } from '@tabler/icons-react';
import { CheckIcon } from '@src/components/icons';
import useStyles from './Checkbox.styles';

const CheckboxIcon: CheckboxProps['icon'] = ({ indeterminate, className }) =>
  indeterminate ? (
    <IconMinus strokeWidth={2.4} className={className} />
  ) : (
    <CheckIcon strokeWidth={2.4} className={className} />
  );

export function Checkbox({ classNames, ...rest }: MantineCheckboxProps) {
  const { classes } = useStyles();

  return (
    <MantineCheckbox
      classNames={{ ...classes, ...(classNames || {}) }}
      icon={CheckboxIcon}
      {...rest}
    />
  );
}
