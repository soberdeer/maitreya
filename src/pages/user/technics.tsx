import React from 'react';
import { Text, Animator } from '@arwes/react';
import { Box, Breadcrumbs, Stack, useMantineTheme } from '@mantine/core';
import fetchBasePage from '@src/util/fetchBasePage';
import { TechnicsList, TechnicsListDataProps } from '@src/components/TechnicsList';
import { FrameWrapper } from '@src/components/FrameWrapper';
import { TypeRituals, TypeUsers } from '@src/util/types';
import { SmallBlock } from '@src/components/TechnicsList/SmallBlock';
import { Meta } from '@src/components/Meta';
import { Error } from '@src/components/Error';
import { Anchor } from '@src/components/Anchor';

interface PageType {
  data: TechnicsListDataProps;
  rituals: TypeRituals[];
  defaultTab?: string;
  user: TypeUsers;
}

export default function Technics({ data, rituals, defaultTab, user }: PageType) {
  const theme = useMantineTheme();
  if (!data) {
    return <Error type="notFound" />;
  }

  return (
    <Box pb={50}>
      <Animator>
        <Meta title="Техники и ритуалы" />
        <Animator manager="stagger" duration={{ enter: 0.4, exit: 0.4 }} combine>
          <FrameWrapper>
            <Breadcrumbs
              pb={30}
              styles={{
                root: { alignItems: 'center' },
                breadcrumb: {
                  whiteSpace: 'normal',
                },
                separator: { color: theme.colors.maitreya[3], height: '100%' },
              }}
            >
              {[
                { title: 'Профиль', href: '/user' },
                { title: 'Навыки', href: '/user/technics' },
              ].map((item, index) => (
                <Animator combine key={index}>
                  <Anchor href={item.href}>{item.title}</Anchor>
                </Animator>
              ))}
            </Breadcrumbs>
            <TechnicsList data={data} defaultTab={defaultTab} isUserTechnics={true} user={user} />
          </FrameWrapper>
        </Animator>
        {rituals && rituals.length > 0 && (
          <Animator manager="stagger" duration={{ enter: 0.4, exit: 0.4 }}>
            <FrameWrapper style={{ marginTop: 20 }}>
              <Text as="h1">Ритуалы</Text>
              <Stack align="flex-start">
                <SmallBlock data={rituals} />
              </Stack>
            </FrameWrapper>
          </Animator>
        )}
      </Animator>
    </Box>
  );
}

export const getServerSideProps = fetchBasePage('technics', true);
