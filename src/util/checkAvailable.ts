import { Entry, EntrySkeletonType } from 'contentful';
import {
  TypeArticles,
  TypeArticlesSkeleton,
  TypeCombat,
  TypeCombatSkeleton,
  TypeFetch,
  TypeFetchSkeleton,
  TypeRituals,
  TypeRitualsSkeleton,
  TypeUsers,
  TypeUsersSkeleton,
} from './types';

const findAccess = <
  T extends EntrySkeletonType = TypeFetchSkeleton,
  S extends EntrySkeletonType = TypeCombatSkeleton
>(
  array?: (Entry<S, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'> | undefined)[],
  data?: Entry<T, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>
): Entry<S, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'> | undefined | null =>
  (array || []).find((entry) => entry?.sys.id === data?.sys.id);

export const checkIntersect = <T extends EntrySkeletonType = TypeFetchSkeleton>(
  data: Entry<T, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>,
  user?: Entry<TypeUsersSkeleton> | null
) => {
  if (!user || Object.keys(user).length === 0) {
    return false;
  }
  const dataTags = data.metadata.tags.map((item) => item.sys.id);
  const userTags = user.metadata.tags.map((item) => item.sys.id);

  return dataTags.filter((value) => userTags.includes(value)).length > 0;
};

const checkItem = <T extends EntrySkeletonType = TypeFetchSkeleton>(
  data: Entry<T, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>,
  user?: TypeUsers | null
) =>
  findAccess<T, TypeCombatSkeleton>(user?.fields?.technics as TypeCombat[] | undefined, data) ||
  findAccess<T, TypeRitualsSkeleton>(user?.fields?.rituals as TypeRituals[] | undefined, data) ||
  findAccess<T, TypeFetchSkeleton>(user?.fields?.personal_access as TypeFetch[] | undefined, data);

export const checkReferences = <T extends EntrySkeletonType = TypeFetchSkeleton>(
  data?: (Entry<T, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'> | undefined)[] | null,
  user?: TypeUsers | null,
  isGuest?: boolean
): Entry<T, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>[] | null | undefined => {
  if (!data) {
    return [];
  }

  if (user?.sys?.id === process.env.MASTER_ID) {
    return data.filter((item) => item) as Entry<T, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>[];
  }

  return (
    (data?.filter((item) => {
      if (!item) {
        return false;
      }
      if (checkIntersect<T>(item, user)) {
        return true;
      }
      if (!item.fields.restricted) {
        return true;
      }
      if (isGuest && item.fields.restricted) {
        return false;
      }

      if (user && item.fields.restricted) {
        return checkItem<T>(item, user) || false;
      }

      return false;
    }) as Entry<T, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>[]) || []
  );
};

export default function checkAvailable(
  data: TypeFetch | null | undefined,
  user: TypeUsers | null | undefined,
  isGuest: boolean
) {
  if (!data) {
    return null;
  }

  if (user?.sys?.id === process.env.MASTER_ID) {
    return data;
  }

  if (data.fields.restricted && isGuest) {
    return null;
  }

  if (checkIntersect(data, user)) {
    return data;
  }

  const clone = { ...data } as TypeArticles;

  if (!data.fields.restricted) {
    clone.fields.restricted_access =
      checkReferences<TypeArticlesSkeleton>(
        (data as TypeArticles).fields.restricted_access || undefined,
        user,
        isGuest
      ) || undefined;
  } else {
    const hasAccess = checkItem(data, user);
    if (!hasAccess) {
      return null;
    }
    clone.fields.restricted_access =
      checkReferences<TypeArticlesSkeleton>(
        (data as TypeArticles).fields.restricted_access,
        user,
        false
      ) || undefined;
  }

  return clone;
}
