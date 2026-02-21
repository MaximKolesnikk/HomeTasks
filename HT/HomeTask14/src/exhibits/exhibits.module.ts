import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibit } from './exhibit.entity';
import { ExhibitsController } from './exhibits.controller';
import { ExhibitsService } from './exhibits.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exhibit]),
    NotificationsModule,
  ],
  controllers: [ExhibitsController],
  providers: [ExhibitsService],
  exports: [TypeOrmModule],
})
export class ExhibitsModule {}
