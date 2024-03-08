import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
  // Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Query,
  // ParseEnumPipe,
  // Res,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientEntity, status } from './clients.entity';
import { ClientRegistrationDTO } from './dto/clientRegistrationDTO';
// import { Client } from './clients.model';
import { UpdateClientProfileDTO } from './dto/updateClientProfileDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

//   //! Get All CLients
  @Get()
  getAllClients(): Promise<ClientEntity[]> {
    return this.clientsService.getAllClients();
  }

//   //! Get Client by ID
  @Get('/:id')
  getClientById(@Param('id', ParseIntPipe) id: number): Promise<ClientEntity> {
    return this.clientsService.getClientById(id);
  }

  //! Get Clients by Inactive Status 
  @Get('/getClients/:status')
  getClientByInactiveStatus(@Param('status') status: status):Promise<ClientEntity[]> {
    return this.clientsService. getClientByInactiveStatus(status);
  }


  //! Get CLients older 40 
  @Get('/getClientsFourty/olderFourty')
  getClientOlder40():Promise<ClientEntity[]> {
    return this.clientsService. getClientOlder40();
  }


//   //! Get Client by Id and User Name
//   @Get()
//   getClientByIdAndUserName(
//     @Query('id') id: string,
//     @Query('userName') userName: string,
//   ): Client {
//     return this.clientsService.getClientByIdAndUserName(id, userName);
//   }

  //! Client Login
  @Get('/clientLogin')
  clientLogin(
    @Query('email') email: string,
    @Query('password') password: string,
  ): Client {
    return this.clientsService.clientLogin(email, password);
  }

//   //! Client Registration
  @Post('/clientRegistration')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      fileFilter(req, profilePicture, cb) {
        if (
          profilePicture.originalname.match(/^.*\.(jpg|webp|png|jpeg|JPG|WEBP|PNG|JPEG)$/)
        )
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      // limits: { fileSize: 30000 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, profilePicture, cb) {
          cb(null, profilePicture.originalname);
        },
      }),
    }),
  )
  @UsePipes(ValidationPipe)
  clientRegistration(
    @Body() clientRegistrationDTO: ClientRegistrationDTO,
    @UploadedFile() myFile: Express.Multer.File,
  ): Promise<ClientEntity> {
    clientRegistrationDTO.profilePicture = myFile.filename;
    return this.clientsService.clientRegistration(
      clientRegistrationDTO,
      myFile
    );
  }

//   //! Get File or Image
//   @Get('/getImage/:name')
//   getFiles(@Param('name') name, @Res() res) {
//     res.sendFile(name, { root: './uploads' });
//   }

//   //! Update Client Profile
  @Patch('/:id/updateProfile')
  updateClientProfile(
    @Param('id') id: number,
    @Body() updateClientProfileDTO: UpdateClientProfileDTO,
  ): Promise<ClientEntity> {
    console.log(ClientEntity);
    return this.clientsService.updateClientProfile(id, updateClientProfileDTO);
  }

  @Patch('/:id/updateStatus/:status')
  updateStatus(@Param('id') id: number,
  @Param('status') newStatus: status):Promise<ClientEntity> {
    return this.clientsService. updateStatus(id, newStatus)
  }

//   //! Delete Client Profile
  @Delete('/:id/deleteProfile')
  deleteClientProfile(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.clientsService.deleteClientProfile(id);
  }
}
