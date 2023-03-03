import { Entry } from 'contentful';
import { FetchType, ArticleProps, RitualProps, TechnicProps, UserProps } from './types';

const checkIntersect = (data: Entry<FetchType>, user: Entry<UserProps>) => {
  if (Object.keys(user).length === 0) {
    return false;
  }
  const dataTags = data.metadata.tags.map((item) => item.sys.id);
  const userTags = user.metadata.tags.map((item) => item.sys.id);

  return dataTags.filter((value) => userTags.includes(value)).length > 0;
};

const checkItem = (data: Entry<FetchType>, user: Entry<UserProps>) => {
  return user?.fields?.personal_access.find(
    (entry: Entry<FetchType>) => entry.sys.id === data.sys.id
  );
};

export const checkReferences = (
  data?: Entry<FetchType>[],
  user?: Entry<UserProps>,
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
  data: Entry<FetchType>,
  user: Entry<UserProps>,
  isGuest: boolean
) {
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
    clone.fields.restricted_access = checkReferences(
      data.fields.restricted_access || null,
      user,
      isGuest
    );
  } else {
    const hasAccess = checkItem(data, user);
    if (!hasAccess) {
      return null;
    }
    clone.fields.restricted_access = checkReferences(
      data.fields.restricted_access || null,
      user,
      false
    );
  }

  return clone;
}
