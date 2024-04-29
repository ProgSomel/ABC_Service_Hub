import {
  IsAlpha,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';
import { status } from '../clients.entity';

export class ClientRegistrationDTO {
  //! First Name
  @IsAlpha()
  @IsNotEmpty()
  @IsString({
    message: '!Error, Invalid type for First Name...First Name Must be String',
  })
  @Matches(/^[^0-9]*$/, { message: 'First Name must not contain any numbers' })
  firstName: string;

  //! Last Name
  @IsAlpha()
  @IsNotEmpty()
  @IsString({
    message: '!Error, Invalid type for Last Name...Last Name Must Be String',
  })
  @Matches(/^[^0-9]*$/, { message: 'Name must not contain any numbers' })
  lastName: string;

  //! Full Name
  @IsAlpha()
  @IsString({
    message: '!Error, Invalid type for Full Name...Full Name Must Be String',
  })
  @Matches(/^[^0-9]*$/, { message: 'Full Name must not contain any numbers' })
  @IsOptional()
  fullName?: string;

  //! User Name
  @IsAlpha()
  @IsNotEmpty()
  @IsString({
    message: '!Error, Invalid type for Last Name...Last Name Must Be String',
  })
  @Matches(/^[^0-9]*$/, { message: 'Name must not contain any numbers' })
  userName: string;

  //! Email
  @IsString({ message: 'Email must be a string' })
  @Length(1, 30, {
    message: 'Email address must be between 1 and 30 characters',
  })
  // @MaxLength(30, {
  //   message: 'Email address must be between 1 and 30 characters',
  // })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: 'Invalid email format, must contain @ and .',
  })
  email: string;

  //! Password
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: '!Error. Password is Required' })
  @Matches(/[@#$&]/, {
    message:
      'Password must contain at least one of the special characters (@, #, $, or &)',
  })
  password: string;

  //! Age
  age: number;

  //! Status
  status: status;

  //! Profile Picture
  @IsOptional()
  profilePicture?: string;

  //! Phone Number
  @Length(1, 11, { message: 'Phone number must not be longer than 11 digits' })
  @IsOptional()
  phoneNumber?: string;

  //! Address
  address?: string;

  //! URL
  @IsUrl()
  @IsOptional()
  fbLinks?: string;

  // @Matches(/^(\d{2})-(\d{2})-(\d{4})$/, {message:"Invalid Date Format"})
  //! Date of Birth
  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;
}
