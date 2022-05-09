import { Model } from 'objection';

export class Role extends Model {
  static token = Symbol('Role');
  static get tableName() {
    return 'role';
  }
  id: string;
  role: string;
}
