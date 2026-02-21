import { Controller, Post, Get, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, } from '@nestjs/swagger';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('/exhibits/:exhibitId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  @ApiOperation({ summary: 'Добавить комментарий к экспонату' })
  @ApiResponse({ status: 201, description: 'Комментарий успешно добавлен' })
  async addComment(
    @Param('exhibitId') exhibitId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(exhibitId, createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все комментарии к экспонату' })
  @ApiResponse({ status: 200, description: 'Список комментариев успешно получен' })
  async getComments(@Param('exhibitId') exhibitId: string) {
    return this.commentsService.findAllByExhibit(exhibitId);
  }

  @Delete(':commentId')
  @ApiOperation({ summary: 'Удалить комментарий' })
  @ApiResponse({ status: 200, description: 'Комментарий успешно удалён' })
  @ApiParam({ name: 'commentId', description: 'ID комментария' })
  async deleteComment(@Param('commentId') commentId: string) {
    return this.commentsService.delete(commentId);
  }
}
