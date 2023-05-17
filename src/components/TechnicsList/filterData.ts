import { LevelType, StandProps, TechnicStateType } from '../../util/types';
import { defaultTechnicsData } from '../../util/groupTechnicsList';

type Data = {
  stand: LevelType<StandProps>;
  melee: LevelType;
  navigation: LevelType;
  shooting: LevelType;
  telepathy: LevelType;
  protection: LevelType;
  recovery: LevelType;
};

export default function filterData(data: Data, filter: TechnicStateType) {
  if (filter === 'И в фуге, и вне фуги') {
    return data;
  }

  return Object.keys(data).reduce((previous, key) => {
    if (key === 'stand') {
      return previous;
    }
    const clone = { ...previous };
    clone[key] = Object.keys(data[key]).reduce((acc, current) => {
      acc[current] = data[key][current].filter((tech) => tech.fields.state === filter);
      return acc;
    }, {});
    return clone;
  }, defaultTechnicsData);
}
