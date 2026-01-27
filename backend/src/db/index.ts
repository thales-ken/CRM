import path from 'path';
import knex, { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const client = (process.env.DB_CLIENT || 'sqlite3') as 'sqlite3' | 'pg';

const connection: Knex.Config['connection'] = client === 'sqlite3'
  ? {
      filename: process.env.DB_FILE || path.join(__dirname, '..', '..', 'data', 'db.sqlite3'),
    }
  : (process.env.DATABASE_URL as string) || 'postgresql://user:password@localhost:5432/crm';

export const db = knex({
  client,
  connection,
  useNullAsDefault: client === 'sqlite3',
  pool: client === 'pg' ? { min: 2, max: 10 } : undefined,
});

export async function healthCheck(): Promise<boolean> {
  try {
    await db.raw(client === 'sqlite3' ? 'select 1' : 'select 1');
    return true;
  } catch (err) {
    console.error('DB health check failed', err);
    return false;
  }
}
