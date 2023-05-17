import React from 'react';
import { Box, Breadcrumbs, useMantineTheme } from '@mantine/core';
import { TypeStands, TypeCombat, isTypeStands, isTypeRituals, TypeRituals } from '@src/util/types';
import fetchChildPage from '@src/util/fetchChildPage';
import { Animator, Text } from '@arwes/react';
import { Technic } from '@src/components/Technic';
import { FrameWrapper } from '@src/components/FrameWrapper';
import { Anchor } from '@src/components/Anchor';
import { Meta } from '@src/components/Meta';
import { Error } from '@src/components/Error';
import { mapTechnicData } from '@src/components/Technic/map-technic-data';

interface PageType {
  data: TypeStands | TypeCombat | TypeRituals;
}

export default function Page({ data }: PageType) {
  const theme = useMantineTheme();
  if (!data) {
    return <Error type="notFound" />;
  }

  return (
    <Box pb={50}>
      <Meta title={data?.fields?.name} />
      <Animator manager="stagger" duration={{ enter: 0.4, exit: 0.4 }}>
        <FrameWrapper>
          {data?.fields ? (
            <>
              <Breadcrumbs
                pb={30}
                styles={{
                  root: { alignItems: 'flex-start' },
                  breadcrumb: {
                    whiteSpace: 'normal',
                  },
                  separator: { color: theme.colors.maitreya[3], height: '100%' },
                }}
              >
                {[
                  { title: 'Техники', href: '/technics' },
                  { title: data.fields.name || 'Техника', href: `/technics/${data.sys.id}` },
                ].map((item, index) => (
                  <Animator combine key={index}>
                    <Anchor href={item.href}>{item.title}</Anchor>
                  </Animator>
                ))}
              </Breadcrumbs>
              <Technic
                data={mapTechnicData(data)}
                stand={isTypeStands(data)}
                ritual={isTypeRituals(data)}
              />
            </>
          ) : (
            <Animator combine>
              <Text style={{ fontFamily: 'Arounder' }}>Техника недоступна</Text>
            </Animator>
          )}
        </FrameWrapper>
      </Animator>
    </Box>
  );
}

export const getServerSideProps = fetchChildPage('technics');
