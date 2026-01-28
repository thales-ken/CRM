import type { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  // Delete existing users
  await knex('users').del();

  const users = [
    {
      email: 'admin@demo.com',
      name: 'Admin User',
      password: await bcrypt.hash('password123', 10),
      role: 'admin',
    },
    {
      email: 'manager@demo.com',
      name: 'Manager User',
      password: await bcrypt.hash('password123', 10),
      role: 'manager',
    },
    {
      email: 'sales@demo.com',
      name: 'Sales Rep',
      password: await bcrypt.hash('password123', 10),
      role: 'sales_rep',
    },
    {
      email: 'viewer@demo.com',
      name: 'Viewer User',
      password: await bcrypt.hash('password123', 10),
      role: 'viewer',
    },
  ];

  await knex('users').insert(users);
}
