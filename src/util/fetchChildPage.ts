import type { GetServerSidePropsContext } from 'next';
import { Entry } from 'contentful';
import { translit } from '@src/util/translit';
import { SCHEME_MAP } from './constants';
import {
  TypeArticles,
  TypeArticlesSkeleton,
  TypeFetch,
  TypeFetchSkeleton,
  TypeMainSkeleton,
} from './types';
import { getEntries, getEntry } from '../contentful';
import checkAvailable from './checkAvailable';
import checkUser, { UserReturn } from './checkUser';

export default function fetchChildPage(forceSlug?: string) {
  return async (context: GetServerSidePropsContext) => {
    const slug = forceSlug || context.query.slug;
    const { childSlug } = context.query;

    if (!slug || !childSlug) {
      return {
        notFound: true,
      };
    }

    const base = await getEntries<TypeMainSkeleton>('main');

    const scheme =
      slug === 'technics'
        ? SCHEME_MAP[slug]
        : // @ts-ignore
          base?.[0]?.fields?.menu?.find((el) => el.href === `/${slug}`);

    if (!scheme) {
      return {
        notFound: true,
      };
    }

    const checkResult = await checkUser(context);

    if (checkResult.redirect) {
      return { redirect: checkResult.redirect };
    }

    const data = await getEntry<TypeFetchSkeleton>((childSlug as string) || '');

    const available = checkAvailable(
      data as TypeFetch,
      (checkResult as UserReturn).user,
      !(checkResult as UserReturn).userId
    ) as Entry<TypeArticlesSkeleton> | null;

    if (!available) {
      return {
        redirect: {
          destination: '/restricted',
          permanent: false,
        },
      };
    }

    const slicedChildren = available
      ? {
          ...available,
          fields: {
            ...(available.fields || {}),
            references:
              // @ts-ignore
              available.fields?.references?.map((entry: Entry<any>) => ({
                ...entry,
                fields: {
                  name: entry.fields.name,
                },
              })) || [],
          },
        }
      : null;

    const toc =
      ((slicedChildren?.fields.restricted_access?.length as number) || 0) > 0
        ? (slicedChildren?.fields.restricted_access as (TypeArticles | undefined)[]).map(
            (content) =>
              content
                ? {
                    name: content.fields.name,
                    id: translit(content.fields.name),
                  }
                : null
          )
        : null;

    try {
      JSON.stringify(slicedChildren || {});
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
        data: slicedChildren,
        toc,
        scheme,
      },
    };
  };
}
