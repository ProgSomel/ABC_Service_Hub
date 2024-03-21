import { ClientEntity } from 'src/clients/clients.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
export enum status {
  Active = 'active',
  Inactive = 'inactive',
}
@Entity('service')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  serviceId: number;

  @Column()
  service_name: string;

  @Column()
  provider_name: string;

  @Column()
  provider_contact: string;

  @Column()
  service_description: string;

  @Column()
  price: number;

  @Column()
  location: string;

  @Column()
  rating: string;

  @Column()
  serviceImg?: string;

  @Column({
    type: 'enum',
    enum: status,
    default: status.Active,
  })
  status: status;

  @ManyToMany(() => ClientEntity, (client) => client.services)
  clients: ClientEntity[];
}
