import { MappedUser } from '@src/components/User/map-user-fields';

type CharsType = {
  в: string;
  м: string;
  о: string;
  з: string;
  д: string;
};

const order = ['о', 'з', 'м', 'в', 'д'];

const nameMap: CharsType = {
  о: 'Огонь',
  в: 'Вода',
  з: 'Земля',
  м: 'Металл',
  д: 'Дерево',
};

export function calcElements(user: MappedUser) {
  const penalties = user.penalty
    ? user.penalty.map((p) => {
        const arr = p.split('--').map((s) => s.trim().toLowerCase());
        return {
          key: arr[0],
          penalty: parseInt(arr[1], 10),
        };
      })
    : [];
  const elObject = [...(user.introjects || []), ...(user.beliefs || [])]
    .map((idea) => idea.split('--')[1].trim())
    .join('')
    .toLowerCase()
    .split('')
    .sort()
    .reduce((acc, char) => {
      const c = char.toLowerCase() as keyof CharsType;
      if (!acc[c]) {
        return {
          ...acc,
          [c]: 1,
        };
      }
      return {
        ...acc,
        [c]: acc[c] + 1,
      };
    }, {} as CharsType);

  const infiniteEl = user.creed ? user.creed.split('--')[1].trim().toLowerCase() : null;
  const max = Object.keys(elObject).reduce(
    // @ts-ignore
    (previous, key) => (elObject[key] > previous ? elObject[key] : previous),
    0
  );

  return {
    values: order.map((shortKey) => {
      let temp = 0;
      if (infiniteEl !== shortKey) {
        const pen = penalties.find((p) => p.key === shortKey)?.penalty || 0;
        const el = elObject[shortKey as keyof CharsType] as unknown as number;
        if (pen <= el) {
          temp = el - pen;
        }
      } else {
        temp = max + 2;
      }
      return {
        amount: temp,
        element: nameMap[shortKey as keyof CharsType],
        infinity: infiniteEl === shortKey,
      };
    }),
    penalties: order.map((shortKey) => ({
      name: nameMap[shortKey as keyof CharsType],
      penalty: penalties.find((p) => p.key === shortKey)?.penalty || 0,
    })),
  };
}
