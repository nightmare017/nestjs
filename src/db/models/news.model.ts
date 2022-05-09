import { Model } from 'objection';
import { Status } from './status.model';
import { User } from './user.model';

export class News extends Model {
  static get tableName() {
    return 'news';
  }
  static token = Symbol('News');
  id: string;
  name: string;
  title: string;
  user_id: string;
  status: string;
  status_id: number;

  static relationMappings() {
    return {
      user: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'news.user_id',
          to: 'user.id',
        },
      },
      status: {
        relation: Model.HasManyRelation,
        modelClass: Status,
        join: {
          from: 'news.status_id',
          to: 'status_id.id',
        },
      },
    };
  }
}
