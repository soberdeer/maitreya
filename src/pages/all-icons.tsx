import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import { getEntries, getEntry } from '@src/contentful';
import type { TypeHouseSkeleton, TypeUsers, TypeUsersSkeleton } from '@src/util/types';
import { Animator } from '@arwes/react';
import { Box, Group } from '@mantine/core';
import { FrameWrapper } from '@src/components/FrameWrapper';
import { Meta } from '@src/components/Meta';
import { Asset, Entry } from 'contentful';
import { Ring } from '@src/components/User/components/Ring';

interface UserPageProps {
  users?: {
    house?: Entry<TypeHouseSkeleton>;
    avatar: Asset;
    homeless: boolean;
    order?: Entry<TypeHouseSkeleton>;
  }[];
}

export default function UserPage({ users }: UserPageProps) {
  return (
    <Box pb={50}>
      <Meta title="Все иконки" />
      <Animator combine manager="stagger">
        <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
          <FrameWrapper>
            <Group align="center" position="center">
              <Animator merge manager="stagger" duration={{ enter: 0.4, exit: 0.4, delay: 0.3 }}>
                {(users || []).map((user) => (
                  <Animator
                    combine
                    merge
                    manager="stagger"
                    duration={{ enter: 0.4, exit: 0.4, delay: 0.1 }}
                  >
                    <Ring
                      size={230}
                      avatar={user?.avatar?.fields?.file?.url as string}
                      colors={
                        (user.order?.fields.color || user.house?.fields.color) as
                          | string[]
                          | undefined
                      }
                    />
                  </Animator>
                ))}
              </Animator>
            </Group>
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

  const users = await getEntries<TypeUsersSkeleton>('users');
  return {
    props: {
      users: (users || []).map((u) => ({
        avatar: u.fields.avatar_profile || null,
        homeless: u.fields.homeless,
        house: u.fields.house || null,
        order: u.fields.order || null,
      })),
    },
  };
}
