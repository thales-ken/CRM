import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create contacts table
  await knex.schema.createTable('contacts', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('phone', 20).notNullable();
    table.string('company', 255).notNullable();
    table.enum('status', ['active', 'inactive', 'prospect']).defaultTo('prospect');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

  // Create deals table
  await knex.schema.createTable('deals', (table) => {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.string('company', 255).notNullable();
    table.decimal('value', 12, 2).notNullable();
    table.enum('stage', ['negotiation', 'proposal', 'won', 'lost']).defaultTo('negotiation');
    table.integer('probability').defaultTo(0);
    table.date('closeDate').notNullable();
    table.string('owner', 255).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

  // Create activities table
  await knex.schema.createTable('activities', (table) => {
    table.increments('id').primary();
    table.enum('type', ['call', 'email', 'meeting', 'note']).notNullable();
    table.text('description').notNullable();
    table.date('date').notNullable();
    table.integer('contactId').unsigned().nullable();
    table.integer('dealId').unsigned().nullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.foreign('contactId').references('contacts.id').onDelete('CASCADE');
    table.foreign('dealId').references('deals.id').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('activities');
  await knex.schema.dropTableIfExists('deals');
  await knex.schema.dropTableIfExists('contacts');
}
