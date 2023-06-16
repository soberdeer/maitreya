import React from 'react';
import { db } from '@src/kysely';
import type { GetServerSidePropsContext } from 'next';
import { getEntry } from '@src/contentful';
import { Box, Breadcrumbs } from '@mantine/core';
import type { TypeUsers, TypeUsersSkeleton, UsersTable } from '@src/util/types';
import { FrameWrapper } from '@src/components/FrameWrapper';
import { Meta } from '@src/components/Meta';
import { Anchor } from '@src/components/Anchor';
import { Editor } from '@src/components/Editor/Editor';
import { Animator } from '@arwes/react';

interface UserPageProps {
  user: TypeUsers;
  dbUser: UsersTable;
}

export default function ChangesPage({ user, dbUser }: UserPageProps) {
  return (
    <Box pb={50}>
      <Meta title="Редактор идей" />
      <Animator combine manager="stagger">
        <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
          <FrameWrapper>
            <Breadcrumbs
              pb={30}
              styles={(theme) => ({
                root: { alignItems: 'center' },
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
        </Animator>
      </Animator>
    </Box>
  );
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const userId = req?.cookies._maitreya_user || null;

  if (!userId || userId === 'guest') {
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
        destination: '/restricted',
        permanent: false,
      },
    };
  }

  let dbUser = await db
    .selectFrom('users')
    .selectAll()
    .where('user_id', '=', userId)
    .execute()
    .then((r: UsersTable[]) => r[0])
    .catch(() => null);

  if (!dbUser && user.sys.id) {
    await db.insertInto('users')
      .values({
        // @ts-ignore
        name: user.fields.name as string || '',
        user_id: user.sys.id,
        added_convictions: '',
        removed_convictions: '',
        added_introjects: '',
        removed_introjects: '',
      })
      .executeTakeFirst();
    dbUser = await db
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
  }

  return {
    props: {
      user,
      dbUser,
    },
  };
}
