import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkersEntity } from '../worker/worker.entity';
import { join } from 'path';
export enum status {
  Active = 'active',
  Inactive = 'inactive',
}
@Entity('service')
export class ServiceEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column()
  service_name: string;

  @Column()
  service_description: string;

  @Column()
  price: number;

  @ManyToMany(() => WorkersEntity, worker => worker.services)
  @JoinTable()
  workers: WorkersEntity[];
}
