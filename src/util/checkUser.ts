import { GetServerSidePropsContext } from 'next';
import { deleteCookie } from 'cookies-next';
import { TypeUsers, TypeUsersSkeleton } from './types';
import { getEntry } from '../contentful';

export type UserReturn = {
  user: TypeUsers | null;
  userId: string | null;
  redirect: null;
};

export type Redirect = { redirect?: Record<string, any> };

export default async function checkUser(
  context: GetServerSidePropsContext
): Promise<UserReturn | Redirect> {
  const { req } = context;
  const userId = req?.cookies._maitreya_user || null;

  if (userId === 'guest') {
    deleteCookie('_maitreya_user', context);
  }

  const user = !userId ? null : await getEntry<TypeUsersSkeleton>(userId);

  return {
    user: user || null,
    userId: userId !== 'guest' ? userId : null,
    redirect: null,
  };
}
