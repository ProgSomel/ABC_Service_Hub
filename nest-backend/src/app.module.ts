import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeORM.config';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ClientsModule, ServiceModule]
})
export class AppModule {}
