import type { GetServerSidePropsContext } from 'next';
import { Entry } from 'contentful';
import { TypeMainSkeleton, TypePageSkeleton, TypeBlockSkeleton } from './types';
import { getEntries } from '../contentful';
import fetchTechnics from './fetchTechnics';
import checkUser, { UserReturn } from './checkUser';
import { updateBlocks } from './updateBlocks';

export default function fetchBasePage(forceSlug?: string) {
  return async (context: GetServerSidePropsContext) => {
    const slug = forceSlug || context.query.slug;

    if (!slug) {
      return {
        notFound: true,
      };
    }

    const result = await checkUser(context);

    if (result.redirect) {
      return { redirect: result.redirect };
    }

    const { user, userId } = result as UserReturn;

    if (slug === 'technics') {
      return fetchTechnics(user, userId, context);
    }

    const base = await getEntries<TypeMainSkeleton>('main');
    // @ts-ignore
    const scheme = base?.[0]?.fields?.menu?.find((el: any) => el.href === `/${slug}`);

    if (!scheme) {
      return {
        notFound: true,
      };
    }

    const data = await getEntries<TypePageSkeleton>('page').then((res) =>
      res?.find((entry) => entry.fields.slug === slug)
    );

    if (!data) {
      return {
        notFound: true,
      };
    }

    const { blocks } = data.fields;

    const updatedBlocks = updateBlocks(
      blocks as Entry<TypeBlockSkeleton, undefined, string>[],
      user,
      userId
    );

    if (updatedBlocks.length === 0) {
      return {
        redirect: {
          destination: '/restricted',
          permanent: false,
        },
      };
    }

    const clone = { ...data };

    clone.fields = { ...data.fields, blocks: updatedBlocks };

    return {
      props: {
        type: slug,
        data: clone || null,
        // query: [slug],
        scheme,
      },
    };
  };
}
