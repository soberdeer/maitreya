import {
  createClient,
  Entry,
  EntrySkeletonType,
  Locale,
  LocaleCollection,
  TagCollection,
} from 'contentful';
import {
  TypeArticlesSkeleton,
  TypeCombatSkeleton,
  TypeFetch,
  TypeRitualsSkeleton,
} from '@src/util/types';
import { getCache, setCache } from './cache';
import { Logger } from './logger';

type IncludeType = 0 | 1 | 2 | 3 | 4 | 10 | 5 | 6 | 7 | 8 | 9 | undefined;

const check = () =>
  process.env.CONTENTFUL_DELIVERY_TOKEN &&
  process.env.CONTENTFUL_SPACE_ID &&
  process.env.CONTENTFUL_ENV;

const index =
  (check() &&
    createClient({
      space: process.env.CONTENTFUL_SPACE_ID || '',
      accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || '',
      environment: process.env.CONTENTFUL_ENV,
      host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com',
      // resolveLinks: true,
    })) ||
  null;

export async function getEntries<T extends EntrySkeletonType>(
  content_type: string,
  include?: IncludeType
): Promise<Entry<T, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>[] | undefined | null> {
  const cached = getCache<Entry<T, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>[] | undefined | null>(
    content_type
  );

  if (cached) {
    return cached;
  }

  return index?.withoutUnresolvableLinks
    .getEntries<T>({ content_type, include: include || 10, limit: 1000 })
    .then((entries) => {
      if (entries.items.length > 0) {
        setCache(content_type, entries.items);
      }
      return entries.items;
    })
    .catch((err) => {
      Logger.error(err);
      return [];
    });
}

export async function getLocales() {
  return index
    ?.getLocales()
    .then((locales: LocaleCollection) => locales.items)
    .catch(() => [] as Locale[]);
}

export async function getTags() {
  return index
    ?.getTags()
    .then((tags: TagCollection) => tags.items)
    .catch(() => []);
}

const searchData = {
  include: 1,
  limit: 100,
  order: '-sys.updatedAt',
  skip: 0,
};

function searchTechnics(query: string) {
  return index?.withoutUnresolvableLinks.getEntries<TypeCombatSkeleton>({
    ...searchData,
    query,
    content_type: 'combat',
    'fields.name[match]': query,
  });
}

function searchRituals(query: string) {
  return index?.withoutUnresolvableLinks.getEntries<TypeRitualsSkeleton>({
    ...searchData,
    query,
    content_type: 'rituals',
    'fields.name[match]': query,
  });
}

function searchArticles(query: string) {
  return [
    index?.withoutUnresolvableLinks.getEntries<TypeArticlesSkeleton>({
      ...searchData,
      query,
      content_type: 'articles',
      'fields.name[match]': query,
    }),
    index?.withoutUnresolvableLinks.getEntries<TypeArticlesSkeleton>({
      ...searchData,
      query,
      content_type: 'articles',
      'fields.description[match]': query,
    }),
  ];
}

export async function search(query: string): Promise<(TypeFetch | undefined)[]> {
  return Promise.all([searchTechnics(query), searchRituals(query), ...searchArticles(query)])
    .then((res) => res.map((r) => r?.items).flat() as TypeFetch[])
    .catch((err) => {
      Logger.error(err);
      return [];
    });
}

export async function getEntry<T extends EntrySkeletonType>(
  id?: string,
  include: IncludeType = 10
): Promise<Entry<T, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'> | null | undefined> {
  if (!id) {
    return null;
  }

  const cached = getCache<Entry<T, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>>(id);

  if (cached) {
    return cached;
  }

  return index?.withoutUnresolvableLinks
    .getEntry<T>(id, {
      include,
      locale: 'ru-RU',
    })
    .then((entry) => {
      if (entry) {
        setCache(id, entry);
      }
      return entry;
    })
    .catch((err) => {
      Logger.error(err);
      return null;
    });
}

export default index;
