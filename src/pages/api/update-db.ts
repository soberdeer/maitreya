import type { NextApiRequest, NextApiResponse } from 'next';
import { UpdateResult } from 'kysely';
import { db } from '@src/kysely';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateResult | { success: boolean }>
) {
  const { body } = req;
  const { added, deleted } = JSON.parse(body);

  const userId = req?.cookies._maitreya_user || null;
  if (!userId || userId === 'guest') {
    return res?.json({ success: false });
  }

  const preData = {
    added_introjects: added.introjects,
    removed_introjects: deleted.introjects,
    added_convictions: added.convictions,
    removed_convictions: deleted.convictions,
  };

  const intersection = [
    ...preData.added_introjects.filter((value: string) =>
      preData.removed_introjects.includes(value)
    ),
    ...preData.added_convictions.filter((value: string) =>
      preData.removed_convictions.includes(value)
    ),
  ];

  const data = Object.keys(preData).reduce(
    (acc, key) => ({
      ...acc,
      [key]: preData[key as keyof typeof preData]
        .filter((idea: string) => !intersection.includes(idea))
        .join('| '),
    }),
    {} as typeof preData
  );

  const result = await db
    .updateTable('users')
    .set(data)
    .where('user_id', '=', userId)
    // .returning('user_id')
    .executeTakeFirstOrThrow();

  return res?.json(result);
}
