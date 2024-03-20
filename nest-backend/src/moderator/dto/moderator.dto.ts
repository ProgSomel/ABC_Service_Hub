import { IsNotEmpty } from "class-validator";

export class ModeratorDto {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    userName: string;
    email: string;
    password: string;
    phone: string;
    age: number;
    address: string;
    dateOfBirth: Date;
    profilePicture: string;
    fbLink: string;
}
