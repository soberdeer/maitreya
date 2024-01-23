import type { NextApiRequest, NextApiResponse } from 'next';
import { getEntries, getEntry, search } from '@src/contentful';
import {
  TypeCombat,
  TypeCombatSkeleton,
  TypeFetch,
  TypePage,
  TypePageSkeleton,
  TypeRitualsSkeleton,
  TypeUsersSkeleton,
} from '@src/util/types';
import { checkReferences } from '@src/util/checkAvailable';
import { updateBlocks } from '@src/util/updateBlocks';
import { getCache, setCache } from '@src/contentful/cache';

type EntryMapped = {
  name: string;
  description?: string;
  id: string;
  link?: string;
  group?: string;
  inside?: boolean;
  query: string;
};
type Data = {
  entries: EntryMapped[];
};

type BlocksType = {
  slug: string;
  id: string;
  restricted: boolean;
  name: string;
  description: any;
  restricted_access: any[];
  references: any[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { body: query } = req;
  const userId = req?.cookies._maitreya_user || null;

  const cached = getCache<EntryMapped[]>(`${userId || 'guest'}-${query}`);

  if (cached) {
    return res?.json({
      entries: cached || [],
    });
  }

  const [searchEntries, pages, user, technics, rituals] = await Promise.all([
    search(query),
    getEntries<TypePageSkeleton>('page', 3),
    !userId ? undefined : getEntry<TypeUsersSkeleton>(userId),
    getEntries<TypeCombatSkeleton>('combat'),
    getEntries<TypeRitualsSkeleton>('rituals'),
  ]);

  const availableTechnics = [
    ...(checkReferences<TypeCombatSkeleton>(technics, user, !userId) || []),
    ...(checkReferences<TypeRitualsSkeleton>(rituals, user, !userId) || []),
  ];

  const availableArticles = (pages as TypePage[])
    ?.map((p) =>
      updateBlocks(p?.fields?.blocks || null, user, userId).map((b) =>
        b.fields.list
          ?.filter((l) => l)
          .map((l) =>
            l
              ? ({
                  slug: p.fields.slug,
                  id: l.sys.id,
                  restricted: l.fields.restricted,
                  name: b.fields.name,
                  description: l?.fields.description,
                  restricted_access: l?.fields.restricted_access || [],
                  references: [],
                } as BlocksType)
              : ({} as BlocksType)
          )
      )
    )
    .flat(2);

  const entries = searchEntries
    ? (searchEntries
        ?.reduce(
          (acc, cur) =>
            cur ? (!acc.find((el) => el.sys.id === cur.sys.id) ? [...acc, cur] : acc) : acc,
          [] as TypeFetch[]
        )
        .map((entry: TypeFetch) => {
          let pageEl =
            entry.sys.contentType.sys.id === 'articles'
              ? (availableArticles.find((l) => l?.id === entry.sys.id) as BlocksType)
              : availableTechnics.find((t) => t?.sys.id === entry.sys.id);
          let parentLink = '';
          if (!pageEl) {
            const parent = availableArticles.find((a) =>
              a?.restricted_access.find((r) => r.sys.id === entry.sys.id)
            );
            if (!parent) {
              return null;
            }
            parentLink = parent?.id || '';
            pageEl = parent;
          }

          let descr = entry.fields.description
            ? entry.fields.description.content
                .map((c) =>
                  c.content.map((cc) => {
                    if (cc.nodeType === 'text') {
                      return cc.value;
                    }
                    if (cc.nodeType === 'paragraph') {
                      return cc.content.map((p) =>
                        p.nodeType === 'text'
                          ? p.value?.toLowerCase().includes(query.toLowerCase())
                            ? p.value
                            : null
                          : null
                      );
                    }
                    if (cc.nodeType === 'list-item') {
                      return cc.content
                        .map((li) =>
                          li.nodeType === 'paragraph'
                            ? li.content.map((p) =>
                                p.nodeType === 'text'
                                  ? p.value?.toLowerCase().includes(query.toLowerCase())
                                    ? p.value
                                    : null
                                  : null
                              )
                            : null
                        )
                        .flat(4)[0];
                    }
                    return null;
                  })
                )
                .flat(3)
                .filter((v) => v && v?.toLowerCase().includes(query.toLowerCase()))?.[0]
            : null;

          if (descr) {
            const i = descr.toLowerCase().indexOf(query.toLowerCase());
            if (i !== -1) {
              const x = descr.slice(0, i).split(' ');
              const item = descr.slice(i, i + query.length);
              const y = descr.slice(i + query.length).split(' ');
              const a = x.slice(x.length - 10 < 0 ? 0 : x.length - 10).join(' ');
              const b = y.slice(0, 10).join(' ');
              descr = `...${a}${item}${b}...`;
            }
          }

          return {
            query,
            name: entry.fields.name,
            description: (entry as TypeCombat).fields.effect || descr || null,
            id: entry.sys.id,
            inside: !!parentLink,
            link:
              pageEl && entry.sys.contentType.sys.id === 'articles'
                ? `${(pageEl as BlocksType).slug}/${parentLink || ''}`
                : 'technics',
            group:
              pageEl && entry.sys.contentType.sys.id === 'articles'
                ? (pageEl as BlocksType).name
                : 'Техники и ритуалы',
          };
        })
        .filter((entry) => entry)
        .sort((a, b) => {
          const aIncludes = a?.name?.toLowerCase().includes(query.toLowerCase());
          const bIncludes = b?.name?.toLowerCase().includes(query.toLowerCase());
          if (aIncludes && !bIncludes) {
            return -1;
          }
          if (!aIncludes && bIncludes) {
            return 1;
          }
          if (aIncludes && bIncludes) {
            return a?.name && b?.name ? a?.name?.localeCompare(b.name, 'ru-RU') : 0;
          }
          return 0;
        }) as EntryMapped[]) || []
    : [];

  setCache(`${userId || 'guest'}-${query}`, entries || []);

  return res?.json({
    entries: entries || [],
  });
}
