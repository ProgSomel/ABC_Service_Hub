import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("worker")
export class WorkersEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email:string;

    @Column()
    password: string;

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
    //randomNumber: number;

    @BeforeInsert()
    generateRandomNumber()
    {
        this.id = Math.floor(Math.random() * 1000);
    }
    
}