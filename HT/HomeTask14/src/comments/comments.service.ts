import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(exhibitId: string, createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      exhibitId,
    });
    return await this.commentRepository.save(comment);
  }

  async findAllByExhibit(exhibitId: string): Promise<Comment[]> {
    return await this.commentRepository.find({ where: { exhibitId } });
  }

  async delete(commentId: string): Promise<void> {
    const result = await this.commentRepository.delete(commentId);
    if (result.affected === 0) {
      throw new NotFoundException('Комментарий не найден');
    }
  }
}
