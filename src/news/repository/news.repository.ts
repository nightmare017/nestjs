import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { News } from 'src/db/models/news.model';
import { Status } from 'src/db/models/status.model';
import { AddNewsDTO } from '../interfaces/addNewsDTO';

@Injectable()
export class NewsRepository {
  constructor(
    @Inject(News.token) private newsModel: ModelClass<News>,
    @Inject(Status.token) private statusModel: ModelClass<Status>,
  ) {}

  async addNews(addNewsDTO: AddNewsDTO, user) {
    const { name, title } = addNewsDTO;
    const newsStatus = await this.statusModel
      .query()
      .where({ status: 'pending approval' })
      .first();
    await this.newsModel.query().insert({
      name: name,
      title: title,
      user_id: user.id,
      status_id: newsStatus.id,
    });
  }

  async getNewsById(params) {
    return await this.newsModel
      .query()
      .select('news.name', 'news.title', 'news.user_id', 'status.status')
      .leftJoin('status', 'news.status_id', 'status.id')
      .findById(params.id);
  }

  async newsApprove(params) {
    const { id } = await this.statusModel
      .query()
      .where({ status: 'published' })
      .first();
    await this.newsModel
      .query()
      .patch({ status_id: id })
      .where({ id: params.id });
  }
}
