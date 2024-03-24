import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class ModeratorDto {
  id: number;

  @IsNotEmpty({ message: 'First is required' })
  @Length(3, 50, { message: 'First Name must of 3 to 50 characters' })
  @Matches(/^[ a-zA-Z.]*$/, { message: 'Name is not valid' })
  firstName: string;

  @IsNotEmpty({ message: 'Last is required' })
  @Length(3, 50, { message: 'Last Name must of 3 to 50 characters' })
  @Matches(/^[ a-zA-Z.]*$/, { message: 'Name is not valid' })
  lastName: string;

  @IsNotEmpty({ message: 'Full Name is required' })
  @Length(3, 50, { message: 'Full Name must of 3 to 50 characters' })
  @Matches(/^[ a-zA-Z.]*$/, { message: 'Name is not valid' })
  fullName: string;

  @IsNotEmpty({ message: 'username is required' })
  @Length(3, 50, { message: 'username must of 3 to 50 characters' })
  @Matches(/^[ a-zA-Z.]*$/, { message: 'Name is not valid' })
  userName: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is not valid' })
  @Length(3, 50, { message: 'Email is not valid' })
  @Matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
    message: 'Email is not valid',
  })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 100, { message: 'Password must be atleast 8 characters long' })
  @Matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/gm, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;

  @IsNotEmpty()
  @Matches(/^(01|\+8801)[3-9][0-9]{8}$/, {
    message: 'Phone number is not valid',
  })
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  fbLink: string;
}
