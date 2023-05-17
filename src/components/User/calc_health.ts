import { MappedUser } from './map-user-fields';

export function calcHealth(user: MappedUser) {
  let health = user.start_health || 1;
  user.beliefs?.forEach(() => {
    health += 1;
  });
  if (user.creed) {
    health += 1;
  }
  return health;
}
