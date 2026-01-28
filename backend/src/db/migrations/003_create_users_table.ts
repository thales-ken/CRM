import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create users table for authentication
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email', 255).notNullable().unique();
    table.string('name', 255).notNullable();
    table.string('password', 255).notNullable();
    table.enum('role', ['admin', 'manager', 'sales_rep', 'viewer']).defaultTo('sales_rep');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}
