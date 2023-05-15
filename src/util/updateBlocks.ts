import { TypeArticles, TypeBlock, TypeFetch, TypeUsers } from './types';
import { checkReferences } from './checkAvailable';

export const updateBlocks = (
  blocks?: (TypeBlock | undefined)[] | null,
  user?: TypeUsers | null,
  userId?: string | null
) =>
  (blocks || []).reduce((previous, current) => {
    if (!current || !current.fields) {
      return previous;
    }
    const clone = { ...current };

    const entries = checkReferences(
      current.fields.list as TypeFetch[] | null | undefined,
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
          } as TypeArticles)
      ),
    };

    return [...previous, clone];
  }, [] as TypeBlock[]);
