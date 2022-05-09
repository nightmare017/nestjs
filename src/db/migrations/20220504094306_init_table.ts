import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.transaction(async (tx) => {
    await tx.schema
      .transacting(tx)
      .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
      .createTable('role', (t) => {
        t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        t.string('role').unique();
      })
      .createTable('user', (t) => {
        t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        t.string('name').notNullable();
        t.string('email').unique().notNullable();
        t.string('password').notNullable();
        t.uuid('role_id')
          .references('id')
          .inTable('role')
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
          .index();
      })
      .createTable('status', (t) => {
        t.increments('id').primary();
        t.string('status');
      })
      .createTable('news', (t) => {
        t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        t.string('name').notNullable();
        t.string('title');
        t.integer('status_id')
          .references('id')
          .inTable('status')
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
          .index();
      })
      .createTable('comment', (t) => {
        t.increments();
        t.uuid('user_id')
          .references('id')
          .inTable('user')
          .onUpdate('CASCADE')
          .onDelete('SET NULL')
          .index();
        t.uuid('news_id')
          .references('id')
          .inTable('news')
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
          .index();
        t.string('comment').notNullable();
      });
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('comment')
    .dropTableIfExists('news')
    .dropTableIfExists('user')
    .dropTableIfExists('role')
    .dropTableIfExists('status');
}
