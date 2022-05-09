import { Injectable } from '@nestjs/common';
import { AddNewsDTO } from './interfaces/addNewsDTO';
import { NewsRepository } from './repository/news.repository';

@Injectable()
export class NewsService {
  constructor(private newsRepository: NewsRepository) {}

  addNews(addNewsDTO: AddNewsDTO, user) {
    this.newsRepository.addNews(addNewsDTO, user);
  }
  getNewsById(params) {
    return this.newsRepository.getNewsById(params);
  }
  newsApprove(params) {
    return this.newsRepository.newsApprove(params);
  }
}
