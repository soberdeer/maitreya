import { Entry } from 'contentful';
import { StandProps, TechnicProps } from './types';
import { TECHNIC_TYPES } from './constants';

type Props = {
  data: Entry<TechnicProps | StandProps>[];
};

const levels = {
  pupil: [],
  adept: [],
  master: [],
};

export const defaultTechnicsData = {
  stand: levels,
  melee: levels,
  navigation: levels,
  shooting: levels,
  telepathy: levels,
  protection: levels,
  recovery: levels,
};

const getLevelKey = (level: string) =>
  level === 'Ученик' ? 'pupil' : level === 'Адепт' ? 'adept' : 'master';

export default function groupTechnics(data?: Entry<TechnicProps | StandProps>[]) {
  return data
    ? data
        .sort((a, b) =>
          a.fields.name > b.fields.name ? 1 : a.fields.name < b.fields.name ? -1 : 0
        )
        .reduce((previous, current) => {
          const clone = { ...previous };
          const currentLevel = getLevelKey(current.fields.level);
          if (current.sys.contentType.sys.id === 'stands') {
            const itemClone = { ...clone.stand };
            itemClone[currentLevel] = [...itemClone[currentLevel], current];
            clone.stand = itemClone;
            return clone;
          }

          const key = Object.keys(TECHNIC_TYPES).find(
            (item) => TECHNIC_TYPES[item] === current.fields.type
          );
          if (!key) {
            return previous;
          }

          const itemClone = { ...clone[key] };
          itemClone[currentLevel] = [...itemClone[currentLevel], current];
          clone[key] = itemClone;
          return clone;
        }, defaultTechnicsData)
    : null;
}
