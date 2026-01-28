import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Delete existing activities
  await knex('activities').del();

  const activities = [
    {
      type: 'call',
      description: 'Initial client discussion',
      date: new Date().toISOString().split('T')[0],
      userId: 1, // admin@demo.com
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      type: 'email',
      description: 'Sent proposal to client',
      date: new Date().toISOString().split('T')[0],
      userId: 2, // manager@demo.com
      createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
    },
    {
      type: 'meeting',
      description: 'Team sync on quarterly goals',
      date: new Date().toISOString().split('T')[0],
      userId: 3, // sales@demo.com
      createdAt: new Date(Date.now() - 900000), // 15 minutes ago
    },
    {
      type: 'note',
      description: 'Follow up required next week',
      date: new Date().toISOString().split('T')[0],
      userId: 1, // admin@demo.com
      createdAt: new Date(), // just now
    },
  ];

  await knex('activities').insert(activities);
}
