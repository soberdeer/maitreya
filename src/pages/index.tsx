import { type ReactElement, useRef } from 'react';
import { Animator, Animated, Text, aa, aaVisibility } from '@arwes/react';
import { createStyles } from '@mantine/core';
import { FrameWrapper } from '@src/components/FrameWrapper';
import checkUser from '@src/util/checkUser';
import { getEntries } from '@src/contentful';
import { GetServerSidePropsContext } from 'next';
import { TypeMain_page, TypeMain_pageSkeleton } from '@src/util/types';
import { Error } from '@src/components/Error';

// const useStyles = createStyles({
//   container: {
//     flex: 1,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '2.5rem 1.25rem',
//   },
//   content: {
//     position: 'relative',
//     display: 'grid',
//     rowGap: '0.5rem',
//     overflow: 'hidden',
//     border: '1px solid transparent',
//     padding: '2rem 4rem',
//     textAlign: 'center',
//   },
//   frame: {
//     zIndex: -1,
//     '& path[data-name="decoration"]': { color: 'hsl(0deg 100% 60%)' },
//     '& path[data-name="shape"]': { color: 'hsl(0deg 50% 10% / 0.5)' },
//   },
//   icon: {
//     margin: '0',
//     width: '4rem',
//     height: '4rem',
//     color: 'hsl(0deg 100% 70%)',
//   },
//   title: {
//     margin: '0',
//     color: 'hsl(0deg 100% 60%)',
//     textShadow: '0 0 2px hsl(0deg 100% 60%)',
//   },
//   description: { margin: '0', color: 'hsl(0deg 50% 85%)' },
// });

export default function Index({ data }: { data?: TypeMain_page }) {
  // const { classes } = useStyles();
  return (
    <Animator combine manager="stagger">
      <Error type="restricted" />
    </Animator>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader('Cache-Control', 'public, s-maxage=259200, must-revalidate');

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
