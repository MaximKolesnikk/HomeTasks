import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibit } from './exhibit.entity';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class ExhibitsService {
  constructor(
    @InjectRepository(Exhibit)
    private readonly exhibitRepository: Repository<Exhibit>,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async createWithImage(createExhibitDto: CreateExhibitDto, filename: string, userId: number): Promise<Exhibit> {
    const exhibit = this.exhibitRepository.create({
      ...createExhibitDto,
      image: filename,
      userId, 
    });
    const savedExhibit = await this.exhibitRepository.save(exhibit);

    this.notificationsGateway.sendNotification(`Новый экспонат создан: ${savedExhibit.name}`);

    return savedExhibit;
  }

  async findAll(): Promise<Exhibit[]> {
    return await this.exhibitRepository.find();
  }

  async findOne(id: string): Promise<Exhibit | null> {
    return await this.exhibitRepository.findOneBy({ id });
  }

  async findByUser(userId: number): Promise<Exhibit[]> {
    return await this.exhibitRepository.find({ where: { userId } });
  }

  async remove(id: string): Promise<void> {
    await this.exhibitRepository.delete(id);
  }
}
