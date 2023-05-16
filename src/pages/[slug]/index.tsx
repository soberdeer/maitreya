import React from 'react';
import { Animator } from '@arwes/react';
import { TypePage } from '@src/util/types';
import { SCHEME_MAP } from '@src/util/constants';
import { ListPage } from '@src/components/ListPage/ListPage';
import fetchBasePage from '@src/util/fetchBasePage';
import { Error } from '@src/components/Error';
import { FrameWrapper } from '@src/components/FrameWrapper/FrameWrapper';
import { Meta } from '@src/components/Meta/Meta';

interface PageType {
  data: TypePage;
  scheme: {
    href: string;
    children: string;
  };
  query?: string[];
  type: keyof typeof SCHEME_MAP;
}

export default function Page({ data }: PageType) {
  if (!data || !data.fields?.blocks) {
    return <Error type="notFound" />;
  }

  return (
    <>
      <Meta title={data.fields.name} />
      <Animator>
        <FrameWrapper>
          <ListPage data={data} />
        </FrameWrapper>
      </Animator>
    </>
  );
}

export const getServerSideProps = fetchBasePage();
