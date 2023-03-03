import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { Text } from '../components/arwes';
import FrameWrapper from '../components/FrameWrapper/FrameWrapper';
import checkUser from '../util/checkUser';
import { getEntries } from '../contentful/client';
import { MainPageType } from '../util/types';
import { Entry } from 'contentful';
import MainPage from '../components/MainPage/MainPage';
import Meta from '../components/Meta/Meta';

export default function Page({ data }: { data?: Entry<MainPageType> }) {
  if (!data) {
    return (
      <FrameWrapper flex autoWidth>
        <Text styledFont>Страница не одобрена Цензоратом</Text>
      </FrameWrapper>
    );
  }

  return (
    <>
      <Meta />
      <MainPage data={data} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader('Cache-Control', 'public, s-maxage=259200, must-revalidate');

  const { redirect } = await checkUser(context);

  if (redirect) {
    return { redirect };
  }

  const data = await getEntries('main_page');

  return {
    props: {
      data: data ? data[0] : null,
    },
  };
}
