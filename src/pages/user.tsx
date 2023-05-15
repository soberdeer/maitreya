import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import type { Entry } from 'contentful';
import { getEntry } from '../contentful/client';
import type { UserProps } from '../util/types';
import { Text } from '../components/arwes';
import FrameWrapper from '../components/FrameWrapper/FrameWrapper';
import User from '../components/User/User';
import Meta from '../components/Meta/Meta';

interface UserPageProps {
  user?: Entry<UserProps> | null;
  // userId?: string;
  // users: Entry<UserProps>[];
  isMaster: boolean;
}

export default function UserPage({ user, isMaster }: UserPageProps) {
  return (
    <>
      <Meta title={user ? user.fields.name : 'Информация не найдена'} />
      <FrameWrapper flex={!user} autoWidth={!user} frameBoxProps={{ style: { padding: 30 } }}>
        {user ? (
          <User user={user?.fields} isMaster={isMaster} />
        ) : (
          <Text styledFont>Цензорат не обладает информацией об этом человеке</Text>
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

  const user = userId === 'guest' ? ({} as Entry<UserProps>) : await getEntry<UserProps>(userId);

  if (userId !== 'guest' && !user) {
    res.setHeader('Set-Cookie', '_maitreya_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      // users,
      user: userId === 'guest' ? null : user || null,
      // userId,
      isMaster: userId === process.env.MASTER_ID,
    },
  };
}
