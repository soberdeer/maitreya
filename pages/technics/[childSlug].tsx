import React, { useContext } from 'react';
import { Entry } from 'contentful';
import { Breadcrumbs } from '@mantine/core';
import colors from '../../styles/colors';
import { StandProps, TechnicProps } from '../../util/types';
import { SCHEME_MAP } from '../../util/constants';
import fetchChildPage from '../../util/fetchChildPage';
import { Text } from '../../components/arwes';
import Technic from '../../components/Technic/Technic';
import FrameWrapper from '../../components/FrameWrapper/FrameWrapper';
import Anchor from '../../components/Anchor/Anchor';
import Meta from '../../components/Meta/Meta';
import PaletteContext from '../../components/contexts/PaletteContext';

interface PageType {
  data: Entry<TechnicProps | StandProps>;
  title: string;
  type: keyof typeof SCHEME_MAP;
}

export default function Page({ data }: PageType) {
  const { palette } = useContext(PaletteContext);

  if (!data) {
    return (
      <FrameWrapper flex>
        <Text as="h1">Информация не найдена</Text>
      </FrameWrapper>
    );
  }

  return (
    <>
      <Meta title={data?.fields?.name} />
      <FrameWrapper flex={!data?.fields}>
        {data?.fields ? (
          <>
            <Breadcrumbs pb={30} styles={{ separator: { color: palette.primary.main } }}>
              {[
                { title: 'Техники', href: '/technics' },
                { title: data.fields.name || 'Техника', href: `/technics/${data.sys.id}` },
              ].map((item, index) => (
                <Anchor href={item.href} key={index}>
                  {item.title}
                </Anchor>
              ))}
            </Breadcrumbs>
            <Technic
              data={data.fields as TechnicProps | StandProps}
              stand={data.sys.contentType.sys.id === 'stands'}
              ritual={data.sys.contentType.sys.id === 'rituals'}
            />
          </>
        ) : (
          <Text styledFont>Техника недоступна</Text>
        )}
      </FrameWrapper>
    </>
  );
}

export const getServerSideProps = fetchChildPage('technics');
