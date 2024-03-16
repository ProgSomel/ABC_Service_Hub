import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeORM.config';
import { WorkersModule } from './worker/worker.module';

@Module({
  imports: [WorkersModule, TypeOrmModule.forRoot(typeOrmConfig)]
})
export class AppModule {}
