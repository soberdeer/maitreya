import {
  createClient,
  Entry,
  EntryCollection,
  Locale,
  LocaleCollection,
  TagCollection,
} from 'contentful';

const check = () =>
  process.env.CONTENTFUL_DELIVERY_TOKEN &&
  process.env.CONTENTFUL_SPACE_ID &&
  process.env.CONTENTFUL_ENV;

const client =
  (check() &&
    createClient({
      space: process.env.CONTENTFUL_SPACE_ID || '',
      accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || '',
      environment: process.env.CONTENTFUL_ENV,
      host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com',
      resolveLinks: true,
    })) ||
  null;

export async function getEntries<T>(content_type: string): Promise<Entry<T>[] | []> {
  return client
    ?.getEntries({ content_type, include: 10 })
    .then((entries: EntryCollection<T>) => entries.items)
    .catch((err) => {
      console.log(err);
      return [];
    });
}

export async function getLocales() {
  return client
    ?.getLocales()
    .then((locales: LocaleCollection) => locales.items)
    .catch(() => [] as Locale[]);
}

export async function getTags() {
  return client
    ?.getTags()
    .then((tags: TagCollection) => tags.items)
    .catch(() => []);
}

export async function getEntry<T>(id: string): Promise<Entry<T> | null> {
  return client
    ?.getEntries({ 'sys.id': id, include: 10, locale: 'ru-RU' })
    .then((entries: EntryCollection<any>) => entries.items[0])
    .catch(() => null);
}

export default client;
