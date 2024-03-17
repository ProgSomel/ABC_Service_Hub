import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeORM.config';
import { WorkersModule } from './worker/worker.module';
import {AuthModule} from './worker/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
    ClientsModule, AuthModule, WorkersModule],
})
export class AppModule {}
