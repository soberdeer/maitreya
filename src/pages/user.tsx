import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import { getEntry } from '@src/contentful';
import type { TypeUsers, TypeUsersSkeleton } from '@src/util/types';
import { Animator } from '@arwes/react';
import { Box } from '@mantine/core';
import { Error } from '@src/components/Error';
import { FrameWrapper } from '@src/components/FrameWrapper';
import { User } from '@src/components/User';
import { Meta } from '@src/components/Meta';

interface UserPageProps {
  user?: TypeUsers | null;
  isMaster: boolean;
}

export default function UserPage({ user, isMaster }: UserPageProps) {
  if (!user) {
    return <Error type="noPerson" />;
  }
  return (
    <Box pb={50}>
      <Meta title={user.fields.name} />
      <Animator combine manager="stagger">
        <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
          <FrameWrapper>
            <User initialUser={user} isMaster={isMaster} />
          </FrameWrapper>
        </Animator>
      </Animator>
    </Box>
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

  const user = userId === 'guest' ? ({} as TypeUsers) : await getEntry<TypeUsersSkeleton>(userId);

  if (!user) {
    res.setHeader('Set-Cookie', '_maitreya_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const mappedUser = {
    ...user,
    fields: {
      ...user.fields,
      personal_access: [],
    },
  };

  return {
    props: {
      user: mappedUser || null,
      isMaster: userId === process.env.MASTER_ID,
    },
  };
}
