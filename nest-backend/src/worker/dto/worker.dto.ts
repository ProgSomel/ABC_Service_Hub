import { IsEmail, IsString } from "@nestjs/class-validator";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsPhoneNumber, MaxLength } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";


export class WorkerDTO {

    @IsNotEmpty()
    @IsString()
    id:string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber('BD')
    phone:string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    bio: string;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsString({each: true})
    skills: string[];

    @IsNotEmpty()
    @IsNumber()
    hourlyRate: number;

    @IsBoolean()
    availability: boolean;
}