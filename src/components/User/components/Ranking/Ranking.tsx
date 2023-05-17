import React, { useMemo } from 'react';
import { Box, BoxProps } from '@mantine/core';
import { aaVisibility, Animated, Text } from '@arwes/react';
import { RankGroupType, RankNumberType } from '@src/util/types';
import useStyles from './Ranking.styles';

type RankType = {
  id: RankGroupType;
  color: string;
  names: string[];
};

const ranks: RankType[] = [
  {
    id: 'До-офицерский состав',
    color: '#868E96',
    names: ['Курсант', 'Младший сержант', 'Сержант', 'Энсин'],
  },
  {
    id: 'Младший офицерский состав',
    color: '#f14b25',
    names: ['Младший лейтенант', 'Лейтенант', 'Старший лейтенант', 'Капитан-Лейтенант'],
  },
  {
    id: 'Старший офицерский состав',
    color: '#F1F3F5',
    names: ['Капитан 3-го ранга', 'Капитан 2-го ранга', 'Капитан 1-го ранга', 'Командор'],
  },
  {
    id: 'Высший офицерский состав',
    color: '#FFD43B',
    names: ['Контр-адмирал', 'Адмирал', 'Адмирал флота', 'Адмирал системы'],
  },
];

export function Ranking({
  className,
  rankGroup,
  rankNumber,
  ...others
}: { rankGroup: RankGroupType; rankNumber: RankNumberType } & BoxProps) {
  const { classes, cx } = useStyles();
  const group = useMemo(() => ranks.find((item) => item.id === rankGroup), [rankGroup]);

  if (!group) {
    return <Text as="span">Не определено</Text>;
  }

  return (
    <Box className={cx(classes.root, className)} {...others}>
      {[...Array(parseInt(rankNumber.slice(0, 1), 10)).keys()].map((_, index) => (
        <Animated
          key={index}
          animated={aaVisibility()}
          className={classes.sphere}
          style={{ backgroundColor: group.color, width: 15, height: 15 }}
        />
      ))}
      <Text as="span" style={{ color: group.color, fontSize: 20 }}>
        {group.names[parseInt(rankNumber.slice(0, 1), 10) - 1]}
      </Text>
    </Box>
  );
}
