import type { GetServerSidePropsContext } from 'next';
import { Entry } from 'contentful';
import { ArticleProps, BaseProps, BlockType, PageProps } from './types';
import { getEntries } from '../contentful/client';
import { checkReferences } from './checkAvailable';
import fetchTechnics from './fetchTechnics';
import checkUser from './checkUser';

export default function fetchBasePage(forceSlug?: string) {
  return async (context: GetServerSidePropsContext) => {
    const slug = forceSlug || context.query.slug;

    if (!slug) {
      return {
        notFound: true,
      };
    }

    const { user, userId, redirect } = await checkUser(context);

    if (redirect) {
      return { redirect };
    }

    if (slug === 'technics') {
      return await fetchTechnics(user, userId);
    }

    const base = await getEntries<BaseProps>('main');
    const scheme = base?.[0]?.fields?.menu?.find((el) => el.href === `/${slug}`);

    if (!scheme) {
      return {
        notFound: true,
      };
    }

    const data: Entry<PageProps> = await getEntries<PageProps>('page').then((res) =>
      res.find((entry) => entry.fields.slug === slug)
    );

    if (!data) {
      return {
        notFound: true,
      };
    }

    const { blocks } = data.fields;

    const updatedBlocks = (blocks || []).reduce((previous, current) => {
      const clone = { ...current };

      const entries = checkReferences(current.fields.list, user, userId === 'guest');
      if (!entries || entries.length === 0) {
        return previous;
      }
      clone.fields = {
        ...clone.fields,
        list: entries.map((entry: Entry<ArticleProps>) => ({
          ...entry,
          fields: {
            name: entry.fields.name,
          },
        })),
      };

      return [...previous, clone];
    }, [] as Entry<BlockType>[]);

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
