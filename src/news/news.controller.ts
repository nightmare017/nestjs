import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { AddNewsDTO } from './interfaces/addNewsDTO';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addNews(@Body() addNewsDTO: AddNewsDTO, @Request() req) {
    return this.newsService.addNews(addNewsDTO, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getNewsById(@Param() param) {
    return this.newsService.getNewsById(param);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Manager)
  @Patch('/:id')
  newsApprove(@Param() param) {
    return this.newsService.newsApprove(param);
  }
}
