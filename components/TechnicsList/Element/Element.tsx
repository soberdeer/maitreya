import React, { useMemo } from 'react';
import { Entry } from 'contentful';
import { StandProps, TechnicProps } from '../../../util/types';
import { useActivate } from '../../../hooks/use-activate';
import LevelsIcon from '../../icons/LevelsIcon/LevelsIcon';
import { Text } from '../../arwes';
import StandardIcon from '../../icons/StandardIcon/StandardIcon';
import Anchor, { AnchorProps } from '../../Anchor/Anchor';
import useStyles from './Element.styles';

export interface Element extends AnchorProps {
  item: Entry<StandProps | TechnicProps>;
}

const standardColors = {
  воин: '#f06595',
  телепат: '#a9e34b',
  целитель: '#51cf66',
  навигатор: '#4dabf7',
};

export default function Element({ item, ...others }: Element) {
  const classes = useStyles();
  const { activate } = useActivate(true);
  const levelKey = useMemo(
    () =>
      item.fields.level === 'Ученик' ? 'pupil' : item.fields.level === 'Адепт' ? 'adept' : 'master',
    [item]
  );

  return (
    <Anchor href={`/technics/${item.sys.id}`} {...others}>
      <div className={classes.flex}>
        <LevelsIcon level={levelKey} size={30} tooltip={item.fields.level} />

        <Text styledFont withHover animator={{ activate, duration: 200 }}>
          {item.fields.name}
        </Text>

        {item.fields.standard?.map((name, index) => (
          <StandardIcon
            key={index}
            tooltip={`Имперский Стандарт - ${name}`}
            size={20}
            color={standardColors[name.toLowerCase()]}
          />
        ))}
      </div>
    </Anchor>
  );
}
