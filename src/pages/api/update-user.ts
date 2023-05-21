import type { NextApiRequest, NextApiResponse } from 'next';
import { getEntries } from '@src/contentful';

type Data = {
  user: string | null;
  success?: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { body } = req;
  const { userCode } = JSON.parse(body);
  const users = await getEntries('users');

  let userResult = null;

  if (userCode) {
    const foundUser = users?.find((entry) => entry.fields.code === userCode);

    if (foundUser) {
      userResult = foundUser.sys.id;
    }
  }

  return res?.json({ user: userResult });
}
