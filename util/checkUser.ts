import { GetServerSidePropsContext } from 'next';
import { Entry } from 'contentful';
import { UserProps } from './types';
import { getEntry } from '../contentful/client';

type ReturnType =
  | {
      user: Entry<UserProps>;
      userId: string;
      redirect: null;
    }
  | { redirect?: Record<string, any> };

export default async function checkUser(context: GetServerSidePropsContext): ReturnType {
  const { req, res } = context;
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
    user: user || null,
    userId,
    redirect: null,
  };
}
