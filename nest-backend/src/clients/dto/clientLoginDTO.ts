import { IsEmail, IsNotEmpty} from 'class-validator';

export class ClientLoginDTO {
   @IsEmail() 
   @IsNotEmpty()
   email: string;
  @IsNotEmpty() 
  password: string;    

}
