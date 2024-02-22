import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientRegistrationDTO } from './dto/clientRegistrationDTO';
import { Client } from './clients.model';
import { UpdateClientProfileDTO } from './dto/updateClientProfileDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  //! Get All CLients 
  @Get()
  getAllClients(): Client[] {
    return this.clientsService.getAllClients();
  }

  //! Get Client by ID 
  @Get('/:id')
  getClientById(@Param('id') id: string): Client {
    return this.clientsService.getClientById(id);
  }

  //! Get Client by Id and User Name 
  @Get()
  getClientByIdAndUserName(
    @Query('id') id: string,
    @Query('userName') userName: string,
  ): Client {
    return this.clientsService.getClientByIdAndUserName(id, userName);
  }

  //! Client Login 
  @Get('/clientLogin')
  clientLogin(@Query('email') email:string, @Query('password') password:string): Client {
    return this.clientsService.clientLogin(email, password);
  }

  //! Get File 
  @Get('/getFile/:name')
  getFiles(@Param('name') name, @Res() res) {
    res.sendFile(name, {root: './uploads'});
  }



  //! Client Registration 
  @Post('/clientRegistration')
  @UsePipes(ValidationPipe)
  clientRegistration(
    @Body() clientRegistrationDTO: ClientRegistrationDTO,
  ): Client {
    
    return this.clientsService.clientRegistration(clientRegistrationDTO);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor ('file', {
    fileFilter(req, file, cb) {
        if(file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
        cb(null, true);
      else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false)
      }

    },
    limits: {fileSize: 30000},
    storage: diskStorage({
      destination: "./uploads",
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
    })
  }))

  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return "SuccessFully Uploaded The File";
  }

  //! Update Client Profile 
  @Patch('/:id/updateProfile')
  updateClientProfile(
    @Param('id') id: string,
    @Body() updateClientProfileDTO: UpdateClientProfileDTO,
  ): Client {
    return this.clientsService.updateClientProfile(id, updateClientProfileDTO);
  }

  //! Delete Client Profile 
  @Delete('/:id/deleteProfile')
  deleteClientProfile(@Param('id') id: string): object {
    return this.clientsService.deleteClientProfile(id);
  }
}
