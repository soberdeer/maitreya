import type { NextApiRequest, NextApiResponse } from 'next';
import { getEntries } from '../../contentful/client';
import { UserProps } from '../../util/types';
import { Entry } from 'contentful';

type Data = {
  user: string | null;
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { body } = req;
  const userCode = JSON.parse(body).userCode;
  const users = await getEntries('users');

  let userResult = null;
  if (userCode === 'guest') {
    userResult = 'guest';
  } else {
    const foundUser = users?.find((entry: Entry<UserProps>) => entry.fields.code === userCode);

    if (foundUser) {
      userResult = foundUser.sys.id;
    }
  }

  return res?.json({ user: userResult });
}
