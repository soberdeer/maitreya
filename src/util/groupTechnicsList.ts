import { Entry, EntrySkeletonType } from 'contentful';
import { TypeCombatSkeleton, TypeStandsSkeleton } from './types';
import { TECHNIC_TYPES } from './constants';

interface LevelsProps<T extends EntrySkeletonType = TypeCombatSkeleton> {
  pupil: Entry<T>[];
  adept: Entry<T>[];
  master: Entry<T>[];
}

const levels = <T extends EntrySkeletonType = TypeCombatSkeleton>(): LevelsProps<T> => ({
  pupil: [],
  adept: [],
  master: [],
});

export const defaultTechnicsData: Record<
  keyof typeof TECHNIC_TYPES,
  LevelsProps<TypeCombatSkeleton | TypeStandsSkeleton>
> = {
  stand: levels<TypeStandsSkeleton>(),
  melee: levels<TypeCombatSkeleton>(),
  navigation: levels<TypeCombatSkeleton>(),
  shooting: levels<TypeCombatSkeleton>(),
  telepathy: levels<TypeCombatSkeleton>(),
  protection: levels<TypeCombatSkeleton>(),
  recovery: levels<TypeCombatSkeleton>(),
};

const getLevelKey = (level: string) =>
  level === 'Ученик' ? 'pupil' : level === 'Адепт' ? 'adept' : 'master';

export default function groupTechnics(data?: Entry<TypeCombatSkeleton | TypeStandsSkeleton>[]) {
  return data
    ? data
        .sort((a, b) => {
          if (!a.fields.name || !b.fields.name) {
            return 0;
          }
          return a.fields.name > b.fields.name ? 1 : a.fields.name < b.fields.name ? -1 : 0;
        })
        .reduce((previous, current) => {
          const clone = { ...previous };
          const currentLevel = getLevelKey(current.fields.level as string);
          if (current.sys.contentType.sys.id === 'stands') {
            const itemClone = { ...clone.stand };
            itemClone[currentLevel] = [...itemClone[currentLevel], current];
            clone.stand = itemClone;
            return clone;
          }

          const key = Object.keys(TECHNIC_TYPES).find(
            (item) => TECHNIC_TYPES[item as keyof typeof TECHNIC_TYPES] === current.fields.type
          ) as keyof typeof TECHNIC_TYPES | undefined;
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
