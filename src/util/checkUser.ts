import { GetServerSidePropsContext } from 'next';
import { TypeUsers, TypeUsersSkeleton } from './types';
import { getEntry } from '../contentful';

export type UserReturn = {
  user: TypeUsers | null;
  userId: string;
  redirect: null;
};

export type Redirect = { redirect?: Record<string, any> };

export default async function checkUser(
  context: GetServerSidePropsContext
): Promise<UserReturn | Redirect> {
  const { req, res } = context;
  const userId = req?.cookies._maitreya_user || null;

  if (!userId) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const user =
    userId === 'guest'
      ? ({} as TypeUsers)
      : await getEntry<TypeUsersSkeleton>(userId);

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
