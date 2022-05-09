import { Model } from 'objection';

export class Status extends Model {
  static token = Symbol('Status');
  static get tableName() {
    return 'status';
  }

  id: number;
  status: string;
}
