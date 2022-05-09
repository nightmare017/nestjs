import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.transaction(async (tx) => {
    return tx.schema.transacting(tx).createTable('comments', (t) => {
      t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      t.uuid('user_id')
        .references('id')
        .inTable('user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      t.uuid('news_id')
        .references('id')
        .inTable('news')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      t.string('comment');
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('comments');
}
