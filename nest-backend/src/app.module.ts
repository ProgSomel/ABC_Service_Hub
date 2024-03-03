import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeORM.config';

@Module({
  imports: [ClientsModule, TypeOrmModule.forRoot(typeOrmConfig)]
})
export class AppModule {}
