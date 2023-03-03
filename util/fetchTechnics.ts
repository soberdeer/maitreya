import { SCHEME_MAP } from './constants';
import { getEntries } from '../contentful/client';
import { FetchType, RitualProps, UserProps } from './types';
import { Entry } from 'contentful';
import { checkReferences } from './checkAvailable';
import groupTechnics from './groupTechnicsList';

export default async function fetchTechnics(user: Entry<UserProps>, userId: string) {
  const slug = 'technics';
  const scheme = SCHEME_MAP[slug];
  const data = scheme.additionalQueries
    ? await Promise.all(
        [scheme.query, ...scheme.additionalQueries].map((item) => getEntries<FetchType>(item))
      ).then((res) => res.flat())
    : await getEntries<FetchType>(scheme.query);

  const rituals = user && userId !== 'guest' ? await getEntries<RitualProps>('rituals') : [];

  const filtered =
    'filter' in scheme
      ? (data as Entry<FetchType>[]).filter(
          (entry: Entry<FetchType>) => entry.fields[scheme.filter.key] === scheme.filter.value
        )
      : data;

  if (filtered.length === 0) {
    return {
      props: {
        data: null,
        type: slug,
        title: scheme.title || '',
        query: [],
      },
    };
  }

  const levels = {
    Ученик: 0,
    Адепт: 1,
    Мастер: 2,
  };

  const available = checkReferences(filtered, user, userId === 'guest');
  const availableRituals = checkReferences(rituals, user, userId === 'guest').sort(
    (a: Entry<RitualProps>, b: Entry<RitualProps>) => {
      if (levels[a.fields.level] > levels[b.fields.level]) {
        return 1;
      }
      if (levels[b.fields.level] > levels[a.fields.level]) {
        return -1;
      }
      return 0;
    }
  );

  if (available.length === 0) {
    return {
      redirect: {
        destination: '/restricted',
        permanent: false,
      },
    };
  }

  return {
    props: {
      type: slug,
      data: groupTechnics(available || null),
      rituals: availableRituals || null,
      title: scheme.title || '',
      query: [slug],
    },
  };
}
