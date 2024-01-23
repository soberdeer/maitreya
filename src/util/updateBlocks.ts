import { TypeArticles, TypeBlock, TypeFetch, TypeUsers } from './types';
import checkAvailable, { checkReferences } from './checkAvailable';

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
      !userId
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
              restricted_access:
                // @ts-ignore
                entry.fields.restricted_access
                  ?.map((r: TypeFetch) => checkAvailable(r, user, !userId))
                  .filter((r: TypeFetch | null) => r)
                  .map((r: any) => ({
                    ...r,
                    fields: Object.keys(r.fields).reduce((p, c) => {
                      if (!Array.isArray(r.fields[c]) && typeof r.fields[c] !== 'object') {
                        return { ...p, [c]: r.fields[c] };
                      }
                      return p;
                    }, {}),
                  })) || [],
            },
          } as TypeArticles)
      ),
    };

    return [...previous, clone];
  }, [] as TypeBlock[]);
