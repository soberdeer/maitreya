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

  return order.map((shortKey) => ({
    // @ts-ignore
    amount: infiniteEl === shortKey ? max + 2 : elObject[shortKey],
    // @ts-ignore
    element: nameMap[shortKey],
    infinity: infiniteEl === shortKey,
  }));
}
