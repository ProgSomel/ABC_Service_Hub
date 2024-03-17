import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './clients.entity';
import { ContactInfoEntity } from './contact-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, ContactInfoEntity])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
