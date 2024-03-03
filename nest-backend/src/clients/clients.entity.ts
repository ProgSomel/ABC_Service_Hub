import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  profilePicture?: string;

  @Column()
  phoneNumber?: string;

  @Column()
  address?: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  fbLinks?: string;
}
