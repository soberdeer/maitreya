import React from 'react';
import { TypeArticles } from 'src/util/types';
import fetchChildPage from '@src/util/fetchChildPage';
import { Article } from '@src/components/Article';
import { ReferencesBlock } from '@src/components/ReferencesBlock';
import { Error } from '@src/components/Error';
import { Meta } from '@src/components/Meta';

interface PageType {
  data: TypeArticles;
  title: string;
  scheme: {
    href: string;
    children: string;
  };
}

export default function Page({ data, scheme }: PageType) {
  if (!data) {
    return <Error type="notFound" />;
  }

  return (
    <>
      <Meta title={data?.fields?.name as string} />
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
          {...(entry?.fields || {})}
          style={{ marginTop: 20 }}
          manager="parallel"
        />
      ))}
      {(data?.fields?.references?.length || 0) > 0 && (
        <ReferencesBlock data={data} scheme={scheme} />
      )}
    </>
  );
}

export const getServerSideProps = fetchChildPage();
