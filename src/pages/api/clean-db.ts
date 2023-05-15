import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@src/kysely';

type Data = {
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { body } = req;
  const { users }: { users: string[] } = JSON.parse(body);

  const userId = req?.cookies._maitreya_user || null;
  if (!userId || userId !== process.env.MASTER_ID) {
    return res?.json({ success: false });
  }

  const result = await Promise.all(
    users.map((u) =>
      db
        .updateTable('users')
        .set({
          added_introjects: '',
          removed_introjects: '',
          added_convictions: '',
          removed_convictions: '',
        })
        .where('user_id', '=', u)
        .executeTakeFirst()
    )
  )
    .then(() => ({ success: true }))
    .catch((err) => err);

  return res?.json(result);
}
