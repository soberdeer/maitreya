import React, { useMemo } from 'react';
import { Text } from '@arwes/react';
import { IconAperture, IconBrandChrome, IconCircleX } from '@tabler/icons-react';
import { HonorType } from '@src/util/types';
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
    children: <IconAperture color="#FFD43B" size={30} />,
  },
  {
    id: 'Человек Чести',
    color: '#F1F3F5',
    children: <IconBrandChrome color="#F1F3F5" size={30} />,
  },
  {
    id: 'Человек без Чести',
    color: '#f14b25',
    children: <IconCircleX color="#f14b25" size={30} />,
  },
];

export function Honor({ className, honor, ...others }: { honor: string } & GroupProps) {
  const { classes, cx } = useStyles();
  const honorItem = useMemo(() => honors.find((item) => honor === item.id), [honor]);

  if (!honorItem) {
    return null;
  }

  return (
    <Group className={cx(classes.root, className)} {...others}>
      {honorItem.children}
      <Text className={classes.text} style={{ color: honorItem.color }}>
        {honor}
      </Text>
    </Group>
  );
}
