import { Entry } from 'contentful';
import { RitualProps, TechnicProps } from '../../../../util/types';

export type SortedSkills<T> = {
  pupil: Entry<T>[];
  adept: Entry<T>[];
  master: Entry<T>[];
};

type SkillType = RitualProps | TechnicProps;
const defaultValue = { pupil: [], adept: [], master: [] };

export default function sortSkills(data?: Entry<SkillType>[]) {
  if (!data) {
    return null;
  }

  const updated = data.reduce((previous, current) => {
    const clone = { ...previous };
    if (current.fields.level === 'Ученик') {
      clone.pupil = [...clone.pupil, current];
    }

    if (current.fields.level === 'Адепт') {
      clone.adept = [...clone.adept, current];
    }

    if (current.fields.level === 'Мастер') {
      clone.master = [...clone.master, current];
    }
    return clone;
  }, defaultValue);

  return Object.keys(updated).reduce((previous, current) => {
    const clone = { ...previous };
    clone[current] = updated[current].sort((a: Entry<SkillType>, b: Entry<SkillType>) =>
      a.fields.name > b.fields.name ? 1 : b.fields.name > a.fields.name ? -1 : 0
    );
    return clone;
  }, defaultValue);
}
