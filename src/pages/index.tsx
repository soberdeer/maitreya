import { Animator } from '@arwes/react';
import { Box } from '@mantine/core';
import checkUser from '@src/util/checkUser';
import { getEntries } from '@src/contentful';
import { GetServerSidePropsContext } from 'next';
import { TypeMain_page, TypeMain_pageSkeleton } from '@src/util/types';
import { Error } from '@src/components/Error';
import { MainPage } from '@src/components/MainPage';
import { Meta } from '@src/components/Meta';

export default function Index({ data }: { data?: TypeMain_page }) {
  if (!data) {
    return (
      <Animator combine manager="stagger">
        <Error type="notAllowed" />
      </Animator>
    );
  }
  return (
    <Box pb={50}>
      <Meta />
      <Animator combine manager="stagger">
        <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
          <MainPage data={data} />
        </Animator>
      </Animator>
    </Box>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { redirect } = await checkUser(context);

  if (redirect) {
    return { redirect };
  }

  const data = await getEntries<TypeMain_pageSkeleton>('main_page');

  return {
    props: {
      data: data ? data[0] : null,
    },
  };
}
