import { createKysely } from '@vercel/postgres-kysely';
import { Database } from '@src/util/types';

export const db = createKysely<Database>();
