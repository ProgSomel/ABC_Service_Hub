import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeORM.config';
<<<<<<< HEAD
import { WorkersModule } from './worker/worker.module';
import {AuthModule} from './worker/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
    ClientsModule, AuthModule, WorkersModule],
=======
import { ServiceModule } from './service/service.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ServiceModule, ClientsModule]
>>>>>>> 8cbf0390aa4ce3143eeda06afcdb54ded3ab9839
})
export class AppModule {}
