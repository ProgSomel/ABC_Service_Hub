import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './clients.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ClientEntity]),],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule {}
