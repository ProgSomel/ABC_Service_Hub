import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("worker")
export class WorkersEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email:string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    bio:string;

    @Column('simple-array')
    skills: string[];

    @Column('decimal',{ precision: 10, scale: 2})
    hourlyRate: number;

    @Column({ default: true})
    availability: boolean;
    
}