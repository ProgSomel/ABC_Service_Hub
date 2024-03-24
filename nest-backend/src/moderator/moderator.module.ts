import { Module } from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { ModeratorController } from './moderator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moderator } from './entities/moderator.entity';
import { WorkersEntity } from 'src/worker/worker.entity';
import { ClientEntity } from 'src/clients/clients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Moderator, WorkersEntity, ClientEntity])],
  controllers: [ModeratorController],
  providers: [ModeratorService],
  exports: [ModeratorService],
})
export class ModeratorModule {}
