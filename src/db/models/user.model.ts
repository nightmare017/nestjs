import { Model } from 'objection';
import { Role } from './role.model';

export class User extends Model {
  static token = Symbol('User');
  static get tableName() {
    return 'user';
  }
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  role_id: string;

  static relationMappings() {
    return {
      role: {
        relation: Model.HasManyRelation,
        modelClass: Role,
        join: {
          from: 'user.role_id',
          to: 'role.id',
        },
      },
    };
  }
}
