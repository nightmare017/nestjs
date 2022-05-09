import { Model } from 'objection';
import { News } from './news.model';
import { User } from './user.model';

export class Comments extends Model {
  static token = Symbol('Comments');

  static get tableName() {
    return 'comments';
  }

  static relationMappings() {
    return {
      user: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'comments.user_id',
          to: 'user.id',
        },
      },
      news: {
        relation: Model.HasManyRelation,
        modelClass: News,
        join: {
          from: 'comments.news_id',
          to: 'news.id',
        },
      },
    };
  }
}
