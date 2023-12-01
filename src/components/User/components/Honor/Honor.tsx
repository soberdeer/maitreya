import React, { useMemo } from 'react';
import { Text } from '@arwes/react';
import { HonorType } from '@src/util/types';
import { ChromeIcon, CircleXIcon, ApertureIcon } from '@src/components/icons';
import { Group, GroupProps } from '@mantine/core';
import useStyles from './Honor.styles';

type HonorWithIdType = {
  id: HonorType;
  color: string;
  children: React.ReactNode;
};

const honors: HonorWithIdType[] = [
  {
    id: 'Человек Высокой Чести',
    color: '#FFD43B',
    children: <ApertureIcon color="#FFD43B" size={30} />,
  },
  {
    id: 'Человек Чести',
    color: '#F1F3F5',
    children: <ChromeIcon color="#F1F3F5" size={30} />,
  },
  {
    id: 'Человек без Чести',
    color: '#f14b25',
    children: <CircleXIcon color="#f14b25" size={30} />,
  },
];

export function Honor({ className, honor, ...others }: { honor: string } & GroupProps) {
  const { classes, cx } = useStyles();
  const honorItem = useMemo(() => honors.find((item) => honor === item.id), [honor]);

  if (!honorItem) {
    return null;
  }

  return (
    <Group className={cx(classes.root, className)} {...others} noWrap>
      {honorItem.children}
      <Text className={classes.text} style={{ color: honorItem.color }} data-styled>
        {honor}
      </Text>
    </Group>
  );
}
