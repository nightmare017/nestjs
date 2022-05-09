import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex('role').insert([
    { id: uuidv4(), role: 'Default' },
    { id: uuidv4(), role: 'Manager' },
    { id: uuidv4(), role: 'Admin' },
  ]);
}
