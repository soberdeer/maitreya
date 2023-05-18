import React, { useMemo } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Box, BoxProps, Center, SimpleGrid } from '@mantine/core';
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
  const number = useMemo(
    () => (rankNumber ? parseInt(rankNumber.slice(0, 1), 10) : null),
    [rankNumber]
  );
  const isSmall = useMediaQuery('(max-width: 400px)');

  if (!group || typeof number !== 'number') {
    return <Text as="span">Не определено</Text>;
  }

  return (
    <Box className={cx(classes.root, className)} {...others}>
      <SimpleGrid cols={isSmall ? 2 : number || 0} spacing={10}>
        {[...Array(number).keys()].map((_, index) => (
          <Center key={index} sx={{ height: '100%' }}>
            <Animated
              animated={aaVisibility()}
              className={classes.sphere}
              style={{ backgroundColor: group.color }}
            />
          </Center>
        ))}
      </SimpleGrid>
      <Text as="span" className={classes.text} style={{ color: group.color }}>
        {group.names[number - 1]}
      </Text>
    </Box>
  );
}
