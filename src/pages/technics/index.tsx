import React from 'react';
import { Text, Animator } from '@arwes/react';
import { Stack } from '@mantine/core';
import { SCHEME_MAP } from '@src/util/constants';
import fetchBasePage from '@src/util/fetchBasePage';
import { TechnicsList, TechnicsListDataProps } from '@src/components/TechnicsList';
import { FrameWrapper } from '@src/components/FrameWrapper';
import { TypeRituals } from '@src/util/types';
import { SmallBlock } from '@src/components/TechnicsList/SmallBlock';
import { Meta } from '@src/components/Meta';
import { Error } from '@src/components/Error';

interface PageType {
  data: TechnicsListDataProps;
  rituals: TypeRituals[];
  title: string;
  query?: string[];
  type: keyof typeof SCHEME_MAP;
  defaultTab?: string;
}

export default function Page({ data, rituals, title, query, defaultTab }: PageType) {
  if (!data) {
    return <Error type="notFound" />;
  }

  return (
    <Animator>
      <Meta title="Техники и ритуалы" />
      <Animator manager="stagger" duration={{ enter: 0.4, exit: 0.4 }} combine>
        <FrameWrapper>
          <TechnicsList data={data} defaultTab={defaultTab} />
        </FrameWrapper>
      </Animator>
      {rituals && rituals.length > 0 && (
        <Animator manager="stagger" duration={{ enter: 0.4, exit: 0.4 }} combine>
          <FrameWrapper style={{ marginTop: 20 }}>
            <Text as="h1">Ритуалы</Text>
            <Stack align="flex-start">
              <SmallBlock data={rituals} />
            </Stack>
          </FrameWrapper>
        </Animator>
      )}
    </Animator>
  );
}

export const getServerSideProps = fetchBasePage('technics');
