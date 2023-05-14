import { GetServerSidePropsContext } from 'next';
import { getCookie } from 'cookies-next';
import { Entry } from 'contentful';
import { SCHEME_MAP } from './constants';
import { getEntries } from '../contentful';
import {
  TypeFetchSkeleton,
  TypeRitualsSkeleton,
  TypeUsersSkeleton,
  TypeCombatSkeleton,
} from './types';
import { checkReferences } from './checkAvailable';
import groupTechnics from './groupTechnicsList';

export default async function fetchTechnics(
  user?: Entry<TypeUsersSkeleton> | null,
  userId?: string,
  context?: GetServerSidePropsContext
) {
  const slug = 'technics';
  const scheme = SCHEME_MAP[slug];
  const data = scheme.additionalQueries
    ? await Promise.all(
        [scheme.query, ...scheme.additionalQueries].map((item) =>
          getEntries<TypeFetchSkeleton>(item)
        )
      ).then((res) => res.flat())
    : await getEntries<TypeFetchSkeleton>(scheme.query);

  const rituals =
    user && userId !== 'guest' ? await getEntries<TypeRitualsSkeleton>('rituals') : [];

  const filtered =
    'filter' in scheme
      ? (data as Entry<TypeFetchSkeleton>[]).filter(
          (entry: Entry<TypeFetchSkeleton>) =>
            // @ts-ignore
            entry.fields[scheme.filter?.key || ''] === scheme.filter?.value
        )
      : data;

  if (filtered?.length === 0) {
    return {
      props: {
        data: null,
        type: slug,
        title: scheme.title || '',
        query: [],
      },
    };
  }

  const levels: Record<'Адепт' | 'Мастер' | 'Ученик', number> = {
    Ученик: 0,
    Адепт: 1,
    Мастер: 2,
  };

  const available = checkReferences<TypeCombatSkeleton>(
    filtered as Entry<TypeCombatSkeleton>[] | null | undefined,
    user,
    userId === 'guest'
  );
  const availableRituals = checkReferences<TypeRitualsSkeleton>(
    rituals,
    user,
    userId === 'guest'
  )?.sort((a: Entry<TypeRitualsSkeleton>, b: Entry<TypeRitualsSkeleton>) => {
    const keyA = a.fields.level as keyof typeof levels;
    const keyB = b.fields.level as keyof typeof levels;
    if (levels[keyA] > levels[keyB]) {
      return 1;
    }
    if (levels[keyB] > levels[keyA]) {
      return -1;
    }
    return 0;
  });

  if (available?.length === 0) {
    return {
      redirect: {
        destination: '/restricted',
        permanent: false,
      },
    };
  }

  const defaultTab = getCookie('maitreya_default_tab', context) || 'melee';

  return {
    props: {
      type: slug,
      // @ts-ignore
      data: groupTechnics(available || null),
      rituals: availableRituals || null,
      title: scheme.title || '',
      query: [slug],
      defaultTab,
    },
  };
}
