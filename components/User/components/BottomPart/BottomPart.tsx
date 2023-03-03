import React, { useMemo } from 'react';
import { Entry } from 'contentful';
import { RitualProps, TechnicProps, UserProps } from '../../../../util/types';
import { Text, TextWithIcon } from '../../../arwes';
import LevelsIcon from '../../../icons/LevelsIcon/LevelsIcon';
import sortSkills, { SortedSkills } from './sortSkills';
import Anchor from '../../../Anchor/Anchor';
import useStyles from './BottomPart.styles';

export default function BottomPart({ user }: { user: UserProps }) {
  const classes = useStyles();
  const technics: SortedSkills<TechnicProps> = useMemo(() => sortSkills(user.technics), [user]);
  const rituals: SortedSkills<RitualProps> = useMemo(() => sortSkills(user.rituals), [user]);

  function mapLink<T>(object: SortedSkills<T>, key: 'pupil' | 'adept' | 'master') {
    return object[key].length > 0
      ? object[key].map((item: Entry<TechnicProps>, index: number) => (
          <Anchor key={index} href={`/technics/${item.sys.id}`}>
            <TextWithIcon
              icon={LevelsIcon}
              palette="secondary"
              iconProps={{ level: key, size: 26, width: 26, height: 26 }}
              withHover
            >
              {item.fields.name}
            </TextWithIcon>
          </Anchor>
        ))
      : null;
  }

  return (
    <div className={classes.root}>
      {technics && (
        <div className={classes.block}>
          <Text as="h2" styledFont palette="secondary">
            Техники
          </Text>
          <div className={classes.data}>
            {mapLink<TechnicProps>(technics, 'pupil')}
            {mapLink<TechnicProps>(technics, 'adept')}
            {mapLink<TechnicProps>(technics, 'master')}
          </div>
        </div>
      )}

      {rituals && (
        <div className={classes.block}>
          <Text as="h2" styledFont palette="secondary">
            Ритуалы
          </Text>
          <div className={classes.data}>
            {mapLink<RitualProps>(rituals, 'pupil')}
            {mapLink<RitualProps>(rituals, 'adept')}
            {mapLink<RitualProps>(rituals, 'master')}
          </div>
        </div>
      )}
    </div>
  );
}
