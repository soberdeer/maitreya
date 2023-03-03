import React, { useState } from 'react';
import cx from 'clsx';
import { StandProps, LevelType, TechnicStateType } from '../../util/types';
import { Text } from '../arwes';
import Block from './Block/Block';
import Filter from './Filter/Filter';
import useStyles from './TechnicsList.styles';

export interface TechnicsListProps extends Omit<React.HTMLProps<HTMLDivElement>, 'data'> {
  data: {
    stand: LevelType<StandProps>;
    melee: LevelType;
    navigation: LevelType;
    shooting: LevelType;
    telepathy: LevelType;
    protection: LevelType;
    recovery: LevelType;
  };
}

export default function TechnicsList({ className, data, ...others }: TechnicsListProps) {
  const classes = useStyles();
  const [filter, setFilter] = useState<TechnicStateType>('Все');

  return (
    <div className={cx(classes.root, className)} {...others}>
      <div className={classes.flex}>
        <Text as="h1" styledFont palette="secondary" style={{ marginBottom: 0 }}>
          Техники и стойки
        </Text>
        <Filter value={filter} onSelect={setFilter} />
      </div>
      {Object.keys(data).map((key, index) => {
        const item = data[key];

        if (Object.keys(item).find((k) => item[k]?.length > 0)) {
          return <Block data={item} type={key} filter={filter} key={index} />;
        }
        return null;
      })}
    </div>
  );
}
