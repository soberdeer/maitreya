import React from 'react';
import { Button } from '@arwes/core';
import { Text } from '../components/arwes';
import Container from '../components/Container/Container';
import FrameCorners from '../components/arwes/FrameCorners/FrameCorners';
import FrameBox from '../components/arwes/FrameBox/FrameBox';
import { useRouter } from 'next/router';
import { useActivate } from '../hooks/use-activate';
import Meta from '../components/Meta/Meta';

export default function Restricted() {
  const { activate } = useActivate();
  const router = useRouter();

  return (
    <>
      <Meta title="Доступ запрещен" />
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 86px)',
        }}
      >
        <FrameCorners animator={{ activate }} style={{ padding: 30 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 30,
            }}
          >
            <Text styledFont>Доступ запрещен Цензоратом</Text>
            <Button FrameComponent={FrameBox} onClick={() => router.back()}>
              Вернуться
            </Button>
          </div>
        </FrameCorners>
      </Container>
    </>
  );
}
