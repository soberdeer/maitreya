import React from 'react';
import cx from 'clsx';
import { Menu, UnstyledButton } from '@mantine/core';
import { Filter as FilterIcon, Check } from 'react-feather';
import AnimatedIcon from '../../AnimatedIcon/AnimatedIcon';
import colors from '../../../styles/colors';
import useStyles from './Filter.styles';

export interface FilterProps extends React.HTMLProps<HTMLDivElement> {
  value: string;

  onSelect(value: string): void;
}

const states = ['Все', 'В фуге', 'Вне фуги'];

export default function Filter({ className, value, onSelect, ...others }: FilterProps) {
  const classes = useStyles();

  return (
    <div className={cx(classes.root, className)} {...others}>
      <Menu width={210}>
        <Menu.Target>
          <UnstyledButton className={classes.filterButton}>
            <AnimatedIcon width={20} height={20}>
              <FilterIcon size={20} color={colors.secondary} />
            </AnimatedIcon>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown className={classes.dropdown}>
          {states.map((item, index) => (
            <Menu.Item
              icon={item === value && <Check size={14} />}
              className={classes.item}
              key={index}
              onClick={() => onSelect(item)}
            >
              {item}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
