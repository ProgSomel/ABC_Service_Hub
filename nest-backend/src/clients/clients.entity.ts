import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContactInfoEntity } from './contact-info.entity';
export enum status {
  Active = 'active',
  Inactive = 'inactive',
}
@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  fullName: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'int', unsigned: true , nullable: true })
  age: number;

  @Column()
  profilePicture?: string;

  @Column({nullable: true})
  phoneNumber?: string;

  @Column()
  address?: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  fbLinks?: string;

  @OneToOne(()=>ContactInfoEntity, contactInfo=>contactInfo.client)
  contactInfo:ContactInfoEntity;


  
  @Column({
    type: 'enum',
    enum: status,
    default: status.Active,
  })
  status: status;


  
}
