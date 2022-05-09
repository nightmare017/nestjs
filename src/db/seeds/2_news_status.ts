import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex('status').insert([
    { id: 1, status: 'pending approval' },
    { id: 2, status: 'published' },
  ]);
}
