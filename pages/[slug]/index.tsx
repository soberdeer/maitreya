import React from 'react';
import { Text } from '@arwes/core';
import { Entry } from 'contentful';
import { PageProps } from '../../util/types';
import { SCHEME_MAP } from '../../util/constants';
import ListPage from '../../components/ListPage/ListPage';
import fetchBasePage from '../../util/fetchBasePage';
import FrameWrapper from '../../components/FrameWrapper/FrameWrapper';
import Meta from '../../components/Meta/Meta';

interface PageType {
  data: Entry<PageProps>;
  scheme: {
    href: string;
    children: string;
  };
  query?: string[];
  type: keyof typeof SCHEME_MAP;
}

export default function Page({ data }: PageType) {
  if (!data || !data.fields?.blocks) {
    return (
      <FrameWrapper flex>
        <Text as="h1">Информация не найдена</Text>
      </FrameWrapper>
    );
  }

  return (
    <>
      <Meta title={data.fields.name} />
      <FrameWrapper>
        <ListPage data={data} />
      </FrameWrapper>
    </>
  );
}

export const getServerSideProps = fetchBasePage();
