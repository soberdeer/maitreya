import type { GetServerSidePropsContext } from 'next';
import { SCHEME_MAP } from './constants';
import { ArticleProps, BaseProps, FetchType } from './types';
import { getEntries, getEntry } from '../contentful/client';
import checkAvailable from './checkAvailable';
import checkUser from './checkUser';
import { Entry } from 'contentful';

export default function fetchChildPage(forceSlug?: string) {
  return async (context: GetServerSidePropsContext) => {
    const slug = forceSlug || context.query.slug;
    const { childSlug } = context.query;

    if (!slug || !childSlug) {
      return {
        notFound: true,
      };
    }



    const base = await getEntries<BaseProps>('main');

    const scheme =
      slug === 'technics'
        ? SCHEME_MAP[slug]
        : base?.[0]?.fields?.menu?.find((el) => el.href === `/${slug}`);

    if (!scheme) {
      return {
        notFound: true,
      };
    }

    const { user, userId, redirect } = await checkUser(context);

    if (redirect) {
      return { redirect };
    }

    const data = await getEntry<FetchType>((childSlug as string) || '');

    const available = checkAvailable(data, user, userId === 'guest') as Entry<ArticleProps> | null;

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
              available.fields?.references?.map((entry: Entry<any>) => ({
                ...entry,
                fields: {
                  name: entry.fields.name,
                },
              })) || [],
          },
        }
      : null;

    return {
      props: {
        type: slug,
        data: slicedChildren,
        scheme,
      },
    };
  };
}
