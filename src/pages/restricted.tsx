import { type ReactElement, useRef } from 'react';
import { Animator, Animated, Text, aa, aaVisibility } from '@arwes/react';
import { createStyles } from '@mantine/core';
import { FrameWrapper } from '@src/components/FrameWrapper';
import checkUser from '@src/util/checkUser';
import { getEntries } from '@src/contentful';
import { GetServerSidePropsContext } from 'next';
import { TypeMain_page, TypeMain_pageSkeleton } from '@src/util/types';
import { Error } from '@src/components/Error';


export default function Index() {
  // const { classes } = useStyles();
  return (
    <Animator combine manager="stagger">
      <Error type="restricted" />
    </Animator>
  );
}
