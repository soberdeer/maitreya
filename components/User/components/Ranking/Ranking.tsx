import React, { useMemo } from 'react';
import cx from 'clsx';
import { Text } from '@arwes/core';
import { RankGroupType, RankNumberType } from '../../../../util/types';
import useStyles from './Ranking.styles';
import AnimatedIcon from '../../../AnimatedIcon/AnimatedIcon';

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

export default function Ranking({
  className,
  rankGroup,
  rankNumber,
  ...others
}: { rankGroup: RankGroupType; rankNumber: RankNumberType } & React.HTMLProps<HTMLDivElement>) {
  const classes = useStyles();
  const group = useMemo(() => ranks.find((item) => item.id === rankGroup), [rankGroup]);

  if (!group) {
    return <Text>Не определено</Text>;
  }

  return (
    <div className={cx(classes.root, className)} {...others}>
      {[...Array(parseInt(rankNumber.slice(0, 1))).keys()].map((_, index) => (
        <AnimatedIcon key={index} width={15} height={15}>
          <div
            className={classes.sphere}
            style={{
              backgroundColor: group.color,
            }}
          />
        </AnimatedIcon>
      ))}
      <Text style={{ color: group.color, fontSize: 20 }}>
        {group.names[parseInt(rankNumber.slice(0, 1)) - 1]}
      </Text>
    </div>
  );
}
