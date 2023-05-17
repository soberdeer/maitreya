import React from 'react';
import { Animator } from '@arwes/react';
import { TypePage } from '@src/util/types';
import { ListPage } from '@src/components/ListPage/ListPage';
import fetchBasePage from '@src/util/fetchBasePage';
import { Error } from '@src/components/Error';
import { FrameWrapper } from '@src/components/FrameWrapper/FrameWrapper';
import { Meta } from '@src/components/Meta/Meta';
import { Box } from '@mantine/core';

interface PageType {
  data: TypePage;
}

export default function Page({ data }: PageType) {
  if (!data || !data.fields?.blocks) {
    return <Error type="notFound" />;
  }

  return (
    <Box pb={50}>
      <Meta title={data.fields.name} />
      <Animator combine manager="stagger">
        <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
          <FrameWrapper>
            <ListPage data={data} />
          </FrameWrapper>
        </Animator>
      </Animator>
    </Box>
  );
}

export const getServerSideProps = fetchBasePage();
