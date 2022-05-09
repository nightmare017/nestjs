import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.transaction(async (tx) => {
    await tx.schema.transacting(tx).alterTable('news', (t) => {
      t.uuid('user_id')
        .references('id')
        .inTable('user')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .index();
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('news', (t) => {
    t.dropColumn('user_id');
  });
}
