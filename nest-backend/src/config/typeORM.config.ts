import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ClientEntity } from 'src/clients/clients.entity';
import { ContactInfoEntity } from 'src/clients/contact-info.entity';
import { OrderEntity } from 'src/order/order.entity';
import { ServiceEntity } from 'src/service/services.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'ABC_Service_Hub', //Change to your database name
  entities: [ClientEntity, ContactInfoEntity, OrderEntity, ServiceEntity],
  autoLoadEntities: true,
  synchronize: true,
};
