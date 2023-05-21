import React from 'react';
import { TypeArticles } from 'src/util/types';
import fetchChildPage from '@src/util/fetchChildPage';
import { Article } from '@src/components/Article';
import { ReferencesBlock } from '@src/components/ReferencesBlock';
import { Error } from '@src/components/Error';
import { Meta } from '@src/components/Meta';
import { Box, Stack } from '@mantine/core';

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
    <Box pb={50}>
      <Meta title={data?.fields?.name as string} />
      <Stack spacing="xl">
        <Article
          {...data?.fields}
          breadcrumbs={[
            { title: scheme?.children, href: scheme?.href },
            { title: data.fields.name || 'Техника', href: `${scheme.href}/${data.sys.id}` },
          ]}
        />
        {data?.fields?.restricted_access?.map((entry, index) => (
          <Article key={index} {...(entry?.fields || {})} />
        ))}
        {(data?.fields?.references?.length || 0) > 0 && (
          <ReferencesBlock data={data} scheme={scheme} />
        )}
      </Stack>
    </Box>
  );
}

export const getServerSideProps = fetchChildPage();
