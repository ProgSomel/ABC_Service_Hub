import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class WorkerRegistrationDTO {

    // @IsNotEmpty()
    // @IsNumber()
     id:number;
 
     @IsNotEmpty()
     @IsString()
     name: string;
 
     @IsNotEmpty()
     imageUrl: string;
 
 
     @IsNotEmpty()
     @IsEmail()
     email: string;
 
     @IsNotEmpty()
     @IsString()
     password: string;
 
     // @IsNotEmpty()
     // @IsPhoneNumber('BD')
     // phone:string;
 
     // @IsNotEmpty()
     // @IsString()
     // address: string;
 
     // @IsNotEmpty()
     // @IsString()
     // bio: string;
 
     // @IsArray()
     // @ArrayNotEmpty()
     // @ArrayUnique()
     // @IsString({each: true})
     // skills: string[];
 
     @IsNotEmpty()
     @IsNumber()
     hourlyRate: number;
 
     @IsBoolean()
     availability: boolean;
 }