import { Global, Module } from '@nestjs/common';
import Knex from 'knex';
import { Model } from 'objection';
import * as knexfile from 'knexfile';
import { MODELS } from 'src/const/const';

const modelProviders = MODELS.map((model) => {
  return {
    provide: model.token,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      return Model.knex(Knex(knexfile));
    },
  },
];
@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DbModule {}
