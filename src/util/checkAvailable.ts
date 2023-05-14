import { Entry, EntrySkeletonType } from 'contentful';
import {
  TypeCombatSkeleton,
  TypeFetchSkeleton,
  TypeRitualsSkeleton,
  TypeUsersSkeleton,
} from './types';

const findAccess = <
  T extends EntrySkeletonType = TypeFetchSkeleton,
  S extends EntrySkeletonType = TypeFetchSkeleton
>(
  array?: (Entry<S> | undefined)[],
  data?: Entry<T>
): Entry<S> | undefined | null => (array || []).find((entry) => entry?.sys.id === data?.sys.id);

export const checkIntersect = <T extends EntrySkeletonType = TypeFetchSkeleton>(
  data: Entry<T>,
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
  data: Entry<T>,
  user?: Entry<TypeUsersSkeleton> | null
) => {
  return (
    findAccess<T, TypeCombatSkeleton>(
      user?.fields?.technics as Entry<TypeCombatSkeleton>[] | undefined,
      data
    ) ||
    findAccess<T, TypeRitualsSkeleton>(
      user?.fields?.rituals as Entry<TypeRitualsSkeleton>[] | undefined,
      data
    ) ||
    findAccess<T, TypeFetchSkeleton>(
      user?.fields?.personal_access as Entry<TypeFetchSkeleton>[] | undefined,
      data
    )
  );
};

export const checkReferences = <T extends EntrySkeletonType = TypeFetchSkeleton>(
  data?: Entry<T>[] | null,
  user?: Entry<TypeUsersSkeleton> | null,
  isGuest?: boolean
) => {
  if (user?.sys?.id === process.env.MASTER_ID) {
    return data;
  }

  return (
    data?.filter((item) => {
      if (checkIntersect(item, user)) {
        return true;
      }
      if (!item.fields.restricted) {
        return true;
      }
      if (isGuest && item.fields.restricted) {
        return false;
      }

      if (user && item.fields.restricted) {
        return checkItem(item, user);
      }
    }) || []
  );
};

export default function checkAvailable(
  data: Entry<TypeFetchSkeleton> | null | undefined,
  user: Entry<TypeUsersSkeleton> | null | undefined,
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

  const clone = { ...data };

  if (!data.fields.restricted) {
    clone.fields.restricted_access =
      checkReferences(
        (data.fields.restricted_access as Entry<TypeFetchSkeleton>[] | null) || undefined,
        user,
        isGuest
      ) || undefined;
  } else {
    const hasAccess = checkItem(data, user);
    if (!hasAccess) {
      return null;
    }
    clone.fields.restricted_access =
      checkReferences(
        (data.fields.restricted_access as Entry<TypeFetchSkeleton>[] | null) || null,
        user,
        false
      ) || undefined;
  }

  return clone;
}
