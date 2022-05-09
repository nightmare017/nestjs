import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
  client: 'pg',
  connection: process.env.CONNECTION_STRING,
  migrations: {
    directory: './src/db/migrations',
  },
  seeds: {
    directory: './src/db/seeds',
  },
  ...knexSnakeCaseMappers(),
} as Knex.Config;
