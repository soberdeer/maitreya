import React, { useContext } from 'react';
import { db } from '@vercel/postgres';
import type { GetServerSidePropsContext } from 'next';
import type { Entry } from 'contentful';
import { getEntry } from '../contentful/client';
import type { UserProps, UsersTable } from '../util/types';
import { Text } from '../components/arwes';
import FrameWrapper from '../components/FrameWrapper/FrameWrapper';
import User from '../components/User/User';
import Meta from '../components/Meta/Meta';
import ChangesTable from '@/components/ChangesTable/ChangesTable';
import Anchor from '@/components/Anchor/Anchor';
import { Breadcrumbs } from '@mantine/core';
import PaletteContext from '@/components/contexts/PaletteContext';

interface UserPageProps {
  users?: UsersTable[];
  columns: any;
  isMaster: boolean;
}

export default function Secret({ users, columns }: UserPageProps) {
  const { palette } = useContext(PaletteContext);
  return (
    <>
      <Meta title="Таблица изменений" />
      <FrameWrapper flex={users.length === 0} autoWidth={users.length === 0}>
        {users.length !== 0 ? (
          <>
            <Breadcrumbs
              pb={30}
              styles={{
                root: { alignItems: 'flex-start' },
                breadcrumb: {
                  whiteSpace: 'normal',
                },
                separator: { color: palette.primary.main,  },
              }}
            >
              {[
                { title: 'Профиль', href: '/user' },
                { title: 'Таблица изменений', href: `/secret` },
              ].map((item, index) => (
                <Anchor href={item.href} key={index}>
                  {item.title}
                </Anchor>
              ))}
            </Breadcrumbs>
            <ChangesTable users={users} />
          </>
        ) : (
          <Text styledFont>Изменений не обнаружено, Цензорат спит спокойно</Text>
        )}
      </FrameWrapper>
    </>
  );
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const userId = req?.cookies['_maitreya_user'] || null;
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
  } catch (error) {}

  return {
    props: {
      users:
        users.rows.filter((user) =>
          [
            'added_convictions',
            'added_introjects',
            'removed_convictions',
            'removed_introjects',
          ].find((key) => user[key] && user[key].length > 0)
        ) || [],
      columns: JSON.parse(JSON.stringify(users.fields)) || [],
    },
  };
}
