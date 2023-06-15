import { ExportElements, nameMap } from '@src/components/User/components/RadarChart/calc_elements';

export const isAvailable = (elements: ExportElements, techElements?: string) => {
  if (!techElements) {
    return true;
  }
  const els = techElements
    ?.toLowerCase()
    .split('')
    .reduce((prev, cur) => {
      const clone = { ...prev };
      if (clone[cur] !== undefined) {
        clone[cur] += 1;
        return clone;
      }
      return { ...prev, [cur]: 1 };
    }, {} as Record<string, number>);

  const a = Object.keys(els).reduce((prev, cur) => {
    const name = nameMap[cur as keyof typeof nameMap];
    const currentValue = elements.values.find((e) => e.element === name);
    const currentPenalty = elements.penalties.find((e) => e.name === name);
    const amount = (currentValue?.amount || 0) - (currentPenalty?.penalty || 0);
    return [...prev, currentValue?.infinity ? true : amount <= els[cur]];
  }, [] as boolean[]);
  return a.indexOf(false) === -1;
};
