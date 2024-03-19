import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeORM.config';
import { ServiceModule } from './service/service.module';
import { WorkersModule } from './worker/worker.module';
import {AuthModule} from './worker/auth/auth.module';

@Module({
<<<<<<< HEAD
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ClientsModule, ServiceModule]
=======
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ServiceModule, ClientsModule, AuthModule, WorkersModule]
>>>>>>> f73421d587e40811e931c592735c39a220a28d39
})
export class AppModule {}