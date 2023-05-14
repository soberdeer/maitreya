import { Animator } from '@arwes/react';
// import { FrameWrapper } from '@src/components/FrameWrapper';
import checkUser from '@src/util/checkUser';
import { getEntries } from '@src/contentful';
import { GetServerSidePropsContext } from 'next';
import { TypeMain_page, TypeMain_pageSkeleton } from '@src/util/types';
import { Error } from '@src/components/Error';

export default function Index({ data }: { data?: TypeMain_page }) {
  console.log(data);
  // const { classes } = useStyles();
  return (
    <Animator combine manager="stagger">
      <Error type="restricted" />
    </Animator>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

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
