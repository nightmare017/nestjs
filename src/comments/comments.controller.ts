import { Body, Controller, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './interfaces/CreateCommentDTO';

@Controller('comments')
export class CommentsController {
  constructor(private commnetsService: CommentsService) {}

  @Post()
  addComment(@Body() createCommentDTO: CreateCommentDTO) {
    // call commentservice, which is calling comments repository, which contains the adding commentary query
  }
}
