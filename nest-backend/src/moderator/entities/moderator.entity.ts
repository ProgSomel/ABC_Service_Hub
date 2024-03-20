import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("moderator")  
export class Moderator {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fullName: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  age: number;

  @Column()
  address: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  profilePicture: string;

  @Column()
  fbLink: string;
}
