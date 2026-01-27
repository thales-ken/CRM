import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = process.env.DB_CLIENT || 'sqlite3';

const baseConfig = {
  client,
  migrations: {
    directory: path.join(__dirname, 'src', 'db', 'migrations'),
    tableName: 'knex_migrations',
    extension: 'ts',
  },
  seeds: {
    directory: path.join(__dirname, 'src', 'db', 'seeds'),
    extension: 'ts',
  },
};

const connection = client === 'sqlite3'
  ? {
      filename: process.env.DB_FILE || path.join(__dirname, 'data', 'db.sqlite3'),
    }
  : (process.env.DATABASE_URL as string);

const config = {
  development: {
    ...baseConfig,
    connection,
    useNullAsDefault: client === 'sqlite3',
  },
  production: {
    ...baseConfig,
    connection,
    useNullAsDefault: client === 'sqlite3',
    pool: client === 'pg' ? { min: 2, max: 10 } : undefined,
  },
};

export default config;
