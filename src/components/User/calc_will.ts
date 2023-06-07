import { MappedUser } from './map-user-fields';

const honorModifiers = {
  'Человек Высокой Чести': 6,
  'Человек Чести': 3,
  'Человек без Чести': -3,
};

export function calcWill(user: MappedUser) {
  let will = typeof user.start_will === 'number' ? user.start_will || 0 : 3;
  user.introjects?.forEach(() => {
    will += 3;
  });
  user.beliefs?.forEach(() => {
    will += 3;
  });
  if (user.creed) {
    will += 10;
  }
  if (user.honor) {
    will += honorModifiers[user.honor] || 0;
  }

  return will;
}
