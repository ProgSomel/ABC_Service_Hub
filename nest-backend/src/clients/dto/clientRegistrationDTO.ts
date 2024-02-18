import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ClientRegistrationDTO {
  
  @IsNotEmpty()
  @IsString({ message: '!Error, Invalid type for First Name' })
  firstName: string;

  @IsNotEmpty()
  @IsString({ message: '!Error, Invalid type for Last Name' })
  lastName: string;
  userName: string;
  @IsEmail()
  email: string;
  password: string;
  profilePicture?: string;
  phoneNumber?: string;
  location?: string;
  createdAt: Date;
}
