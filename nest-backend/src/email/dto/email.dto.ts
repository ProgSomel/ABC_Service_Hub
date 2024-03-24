import { IsEmail } from "class-validator";

export class EmailDto {
  @IsEmail({}, { message: 'Email is not valid' })
  to: string;

  subject: string;

  text: string;
}
