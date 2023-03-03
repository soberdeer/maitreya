import React from 'react';
import { Entry } from 'contentful';
import { SCHEME_MAP } from '../../util/constants';
import fetchBasePage from '../../util/fetchBasePage';
import { Text } from '../../components/arwes';
import TechnicsList, { TechnicsListProps } from '../../components/TechnicsList/TechnicsList';
import FrameWrapper from '../../components/FrameWrapper/FrameWrapper';
import { RitualProps } from '../../util/types';
import SmallBlock from '../../components/TechnicsList/SmallBlock/SmallBlock';
import Meta from '../../components/Meta/Meta';

interface PageType {
  data: TechnicsListProps;
  rituals: Entry<RitualProps>[];
  title: string;
  query?: string[];
  type: keyof typeof SCHEME_MAP;
}

export default function Page({ data, rituals, title, query }: PageType) {
  if (!data) {
    return (
      <FrameWrapper>
        <div style={{ width: '100%', display: 'flex' }}>
          <Text as="h1">Информация не найдена</Text>
        </div>
      </FrameWrapper>
    );
  }

  return (
    <>
      <Meta title="Техники и ритуалы" />
      <FrameWrapper>
        <TechnicsList data={data} />
      </FrameWrapper>
      {rituals && rituals.length > 0 && (
        <FrameWrapper style={{ marginTop: 20 }}>
          <Text as="h1" styledFont palette="secondary">
            Ритуалы
          </Text>
          <SmallBlock data={rituals} style={{ marginTop: 20 }} />
        </FrameWrapper>
      )}
    </>
  );
}

export const getServerSideProps = fetchBasePage('technics');
