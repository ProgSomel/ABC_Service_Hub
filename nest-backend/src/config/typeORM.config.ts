import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'S@mel',
  database: 'ABC_Service_Hub', //Change to your database name
  autoLoadEntities: true,
  synchronize: true,
};
