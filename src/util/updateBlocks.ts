import { Entry } from 'contentful';
import {
  TypeArticlesSkeleton,
  TypeBlockSkeleton,
  TypeFetchSkeleton,
  TypeUsersSkeleton,
} from './types';
import { checkReferences } from './checkAvailable';

export const updateBlocks = (
  blocks: Entry<TypeBlockSkeleton, undefined, string>[] | undefined,
  user?: Entry<TypeUsersSkeleton> | null,
  userId?: string
) =>
  (blocks || []).reduce((previous, current) => {
    const clone = { ...current };

    const entries = checkReferences(
      current.fields.list as Entry<TypeFetchSkeleton>[] | null | undefined,
      user,
      userId === 'guest'
    );
    if (!entries || entries.length === 0) {
      return previous;
    }
    clone.fields = {
      ...clone.fields,
      list: entries.map(
        (entry) =>
          ({
            ...entry,
            fields: {
              name: entry.fields.name,
            },
          } as Entry<TypeArticlesSkeleton, undefined, string>)
      ),
    };

    return [...previous, clone];
  }, [] as Entry<TypeBlockSkeleton, undefined, string>[]);
