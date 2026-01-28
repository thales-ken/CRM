import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('activities', (table) => {
    table.integer('userId').unsigned().nullable();
    table.foreign('userId').references('users.id').onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('activities', (table) => {
    table.dropForeign(['userId']);
    table.dropColumn('userId');
  });
}
