import { TypeRituals, TypeCombat } from '@src/util/types';

export type SortedSkills<T = TypeCombat | TypeRituals> = {
  pupil: T[];
  adept: T[];
  master: T[];
};

const defaultValue = <T>() => ({
  pupil: [] as T[],
  adept: [] as T[],
  master: [] as T[],
});

export default function sortSkills<T>(data?: T[]) {
  if (!data) {
    return {
      pupil: [],
      adept: [],
      master: [],
    };
  }

  const updated = data.reduce((previous, current) => {
    const clone = { ...previous };
    //@ts-ignore
    if (current.fields?.level === 'Ученик') {
      clone.pupil = [...clone.pupil, current];
    }
    //@ts-ignore
    if (current.fields?.level === 'Адепт') {
      clone.adept = [...clone.adept, current];
    }
    //@ts-ignore
    if (current.fields?.level === 'Мастер') {
      clone.master = [...clone.master, current];
    }
    return clone;
  }, defaultValue<T>());

  // @ts-ignore
  return Object.keys(updated).reduce((previous, current) => {
    const clone = { ...previous };
    //@ts-ignore
    clone[current] = updated[current].sort((a: T, b: T) =>
      //@ts-ignore
      a.fields.name > b.fields.name ? 1 : b.fields.name > a.fields.name ? -1 : 0
    );
    return clone;
  }, defaultValue) as SortedSkills<T>;
}
