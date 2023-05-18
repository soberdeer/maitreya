import React from 'react';
import { db } from '@vercel/postgres';
import type { GetServerSidePropsContext } from 'next';
import { Box, Breadcrumbs, useMantineTheme } from '@mantine/core';
import type { UsersTable } from '@src/util/types';
import { Animator } from '@arwes/react';
import { FrameWrapper } from '@src/components/FrameWrapper/FrameWrapper';
import { Meta } from '@src/components/Meta/Meta';
import { SecretTable } from '@src/components/SecretTable';
import { Error } from '@src/components/Error';
import { Anchor } from '@src/components/Anchor';
import { Logger } from '@src/contentful/logger';

interface UserPageProps {
  users?: UsersTable[];
}

export default function Secret({ users }: UserPageProps) {
  const theme = useMantineTheme();
  if (!users || users.length === 0) {
    return <Error type="noChanges" />;
  }
  return (
    <Box pb={50}>
      <Meta title="Таблица изменений" />
      <Animator combine manager="stagger">
        <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
          <FrameWrapper>
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
                { title: 'Профиль', href: '/user' },
                { title: 'Таблица изменений', href: '/secret' },
              ].map((item, index) => (
                <Anchor href={item.href} key={index}>
                  {item.title}
                </Anchor>
              ))}
            </Breadcrumbs>
            <SecretTable users={users} />
          </FrameWrapper>
        </Animator>
      </Animator>
    </Box>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const userId = req?.cookies._maitreya_user || null;
  if (!userId) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (userId !== process.env.MASTER_ID) {
    return {
      redirect: {
        destination: '/restricted',
        permanent: false,
      },
    };
  }

  const client = await db.connect();
  let users;
  try {
    users = await client.sql`SELECT * FROM Users`;
  } catch (error) {
    Logger.error(error);
  }

  return {
    props: {
      users:
        users?.rows.filter((user) =>
          [
            'added_convictions',
            'added_introjects',
            'removed_convictions',
            'removed_introjects',
          ].find((key) => user[key] && user[key].length > 0)
        ) || [],
    },
  };
}
