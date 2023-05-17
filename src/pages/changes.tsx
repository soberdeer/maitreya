import React from 'react';
import { db } from '@src/kysely';
import type { GetServerSidePropsContext } from 'next';
import { getEntry } from '@src/contentful';
import { Breadcrumbs } from '@mantine/core';
import type { TypeUsers, TypeUsersSkeleton, UsersTable } from '@src/util/types';
import { FrameWrapper } from '@src/components/FrameWrapper';
import { User } from '@src/components/User';
import { Meta } from '@src/components/Meta';
import { Anchor } from '@src/components/Anchor';
import { Technic } from '@src/components/Technic';
import { Editor } from '@src/components/Editor/Editor';

interface UserPageProps {
  user: TypeUsers;
  dbUser: UsersTable;
}

export default function ChangesPage({ user, dbUser }: UserPageProps) {
  return (
    <>
      <Meta title="Редактор идей" />
      <FrameWrapper>
        <Breadcrumbs
          pb={30}
          styles={(theme) => ({
            root: { alignItems: 'flex-start' },
            breadcrumb: {
              whiteSpace: 'normal',
            },
            separator: { color: theme.colors.maitreya[3], height: '100%' },
          })}
        >
          {[
            { title: 'Профиль', href: '/user' },
            { title: 'Редактор идей', href: '/changes' },
          ].map((item, index) => (
            <Anchor href={item.href} key={index}>
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>
        <Editor user={user} dbUser={dbUser} />
      </FrameWrapper>
    </>
  );
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const userId = req?.cookies._maitreya_user || null;
  if (!userId) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (userId === 'guest') {
    return {
      redirect: {
        destination: '/restricted',
        permanent: false,
      },
    };
  }

  const user = await getEntry<TypeUsersSkeleton>(userId);

  if (!user) {
    res.setHeader('Set-Cookie', '_maitreya_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const dbUser = await db
    .selectFrom('users')
    .selectAll()
    .where('user_id', '=', userId)
    .execute()
    .then((r: UsersTable[]) => r[0])
    .catch(() => null);

  if (!dbUser) {
    return {
      redirect: {
        destination: '/restricted',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
      dbUser,
    },
  };
}
