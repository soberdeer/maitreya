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
  user?: Entry<TypeUsersSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'> | null,
  userId?: string | null,
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

  const rituals = user && userId ? await getEntries<TypeRitualsSkeleton>('rituals') : [];

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

  const levelKeys = {
    pupil: 'Ученик',
    adept: 'Адепт',
    master: 'Мастер',
  };

  const levels: Record<(typeof levelKeys)[keyof typeof levelKeys], number> = {
    [levelKeys.pupil]: 0,
    [levelKeys.adept]: 1,
    [levelKeys.master]: 2,
  };

  const available = checkReferences<TypeCombatSkeleton>(
    filtered as
      | Entry<TypeCombatSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>[]
      | null
      | undefined,
    user,
    !userId
  );
  const availableRituals = checkReferences<TypeRitualsSkeleton>(rituals, user, !userId)?.sort(
    (a: Entry<TypeRitualsSkeleton>, b: Entry<TypeRitualsSkeleton>) => {
      const keyA = a.fields.level as keyof typeof levels;
      const keyB = b.fields.level as keyof typeof levels;
      if (levels[keyA] > levels[keyB]) {
        return 1;
      }
      if (levels[keyB] > levels[keyA]) {
        return -1;
      }
      return 0;
    }
  );

  if (available?.length === 0) {
    return {
      redirect: {
        destination: '/restricted',
        permanent: false,
      },
    };
  }

  const defaultTab = getCookie('maitreya_default_tab', context) || (!userId ? 'stand' : 'melee');

  try {
    JSON.stringify(available || {});
    JSON.stringify(availableRituals || {});
  } catch {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }

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
