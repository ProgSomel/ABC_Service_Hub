import {
  Controller,
  Post,
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
import { ContactInfoEntity } from './contact-info.entity';
import { Body } from '@nestjs/common';
import { OrderEntity } from 'src/order/order.entity';

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
  getClientByInactiveStatus(
    @Param('status') status: status,
  ): Promise<ClientEntity[]> {
    return this.clientsService.getClientByInactiveStatus(status);
  }

  //! Get Clients older 40
  @Get('/getClientsFourty/olderFourty')
  getClientOlder40(): Promise<ClientEntity[]> {
    return this.clientsService.getClientOlder40();
  }

  //! Get Client With Contact Info
  @Get('/clientWithContactInfo/:id')
  async getClientDetails(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ client: ClientEntity; contactInfo: ContactInfoEntity }> {
    const clientDetails = await this.clientsService.getClientDetails(id);
    return clientDetails;
  }

  //   //! Get Client by Id and User Name
  //   @Get()
  //   getClientByIdAndUserName(
  //     @Query('id') id: string,
  //     @Query('userName') userName: string,
  //   ): Client {
  //     return this.clientsService.getClientByIdAndUserName(id, userName);
  //   }

  // //! Client Login
  // @Get('/clientLogin')
  // clientLogin(
  //   @Query('email') email: string,
  //   @Query('password') password: string,
  // ): Client {
  //   //return this.clientsService.clientLogin(email, password);
  // }


  //! Get OrdersBy ClientId 
  @Get('/getOrders/:clientId')
  async getOrdersByClientId(@Param('clientId') clienId: number):Promise<OrderEntity[]> {
    return this.clientsService.getOrdersByClientId(clienId);
  }

  //   //! Client Registration
  @Post('/clientRegistration')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      fileFilter(req, profilePicture, cb) {
        if (
          profilePicture.originalname.match(
            /^.*\.(jpg|webp|png|jpeg|JPG|WEBP|PNG|JPEG)$/,
          )
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
      myFile,
    );
  }

  //! Client Contact Info
  @Post('/addClientContact/:clientId')
  async addContactInfoOfClient(
    @Param('clientId') clientId: number,
    @Body() contactInfoEntity: ContactInfoEntity,
  ): Promise<ContactInfoEntity> {
    return this.clientsService.addContactInfoOfClient(
      clientId,
      contactInfoEntity,
    );
  }

  //! Create Order
  @Post('/createOrder/:clientId')
  async createOrder(
    @Param('clientId') clientId: number,
    @Body() order: OrderEntity,
  ): Promise<OrderEntity> {
    return this.clientsService.createOrder(clientId, order);
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
  updateStatus(
    @Param('id') id: number,
    @Param('status') newStatus: status,
  ): Promise<ClientEntity> {
    return this.clientsService.updateStatus(id, newStatus);
  }

  //   //! Delete Client Profile
  @Delete('/:id/deleteProfile')
  deleteClientProfile(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.clientsService.deleteClientProfile(id);
  }
}
