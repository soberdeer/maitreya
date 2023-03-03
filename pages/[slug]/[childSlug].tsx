import React from 'react';
import { Entry } from 'contentful';
import { ArticleProps } from '../../util/types';
import { Text } from '../../components/arwes';
import Article from '../../components/Article/Article';
import fetchChildPage from '../../util/fetchChildPage';
import FrameWrapper from '../../components/FrameWrapper/FrameWrapper';
import Anchor from '../../components/Anchor/Anchor';
import ReferencesBlock from '../../components/ReferencesBlock/ReferencesBlock';
import Meta from '../../components/Meta/Meta';

interface PageType {
  data: Entry<ArticleProps>;
  title: string;
  scheme: {
    href: string;
    children: string;
  };
}

export default function Page({ data, scheme }: PageType) {
  if (!data) {
    return (
      <FrameWrapper autoWidth flex>
        <Text as="h1">Информация не найдена</Text>
      </FrameWrapper>
    );
  }

  return (
    <>
      <Meta title={data?.fields?.name} />
      <Article
        {...data?.fields}
        manager="parallel"
        breadcrumbs={[
          { title: scheme?.children, href: scheme?.href },
          { title: data.fields.name || 'Техника', href: `${scheme.href}/${data.sys.id}` },
        ]}
      />
      {data?.fields?.restricted_access?.map((entry, index) => (
        <Article
          key={index}
          {...(entry.fields as ArticleProps)}
          style={{ marginTop: 20 }}
          manager="parallel"
        />
      ))}
      {data?.fields?.references?.length > 0 && <ReferencesBlock data={data} scheme={scheme} />}
    </>
  );
}

export const getServerSideProps = fetchChildPage();
