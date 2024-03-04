import { ClientRegistrationDTO } from './dto/clientRegistrationDTO';
import { UpdateClientProfileDTO } from './dto/updateClientProfileDTO';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity, status } from './clients.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private userRepository: Repository<ClientEntity>,
  ) {}
  // private clients: Client[] = [];

  //! Get  Clients
  // getAllClients(): Client[] {
  //   return this.clients;
  // }
  async getAllClients(): Promise<ClientEntity[]> {
    return this.userRepository.find();
  }

 

  // getClientById(id: string): Client {
  //   const found = this.clients.find((client) => client.id === id);
  //   if (!found) {
  //     throw new NotFoundException('!Client Not Found');
  //   }
  //   return found;
  // }

  //! get Client by ID
  async getClientById(id: number): Promise<ClientEntity | undefined> {
    const found = await this.userRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException(`Client with ID ${id} not Found`);
    } else {
      return found;
    }
  }

  //! Get client by Inactive Status 
  async getClientByInactiveStatus(status: status): Promise<ClientEntity[]> {
    return this.userRepository.find({
      where: 
      { status: status },
      
      })
      
  }

  //! Get client older 40 
  async getClientOlder40(): Promise<ClientEntity[]> {
    return this.userRepository.find({
      where: 
      { age: MoreThan(40)},
      
      })
  }

  // getClientByIdAndUserName(id: string, userName: string): Client {
  //   return this.clients.find(
  //     (client) => client.id === id && client.userName === userName,
  //   );
  // }

  // clientRegistration(
  //   clientRegistrationDTO: ClientRegistrationDTO,
  //   file: Express.Multer.File,
  // ): Client {
  //   const {
  //     firstName,
  //     lastName,
  //     userName,
  //     email,
  //     fbLinks,
  //     phoneNumber,
  //     address,
  //     dateOfBirth,
  //     password,
  //   } = clientRegistrationDTO;

  //   const client: Client = {
  //     id: uuidv4(),
  //     firstName: firstName,
  //     lastName: lastName,
  //     userName: userName,
  //     email: email,
  //     password: password,
  //     phoneNumber: phoneNumber,
  //     address: address,
  //     dateOfBirth: dateOfBirth,
  //     fbLinks: fbLinks,
  //     profilePicture: file?.filename,
  //   };

  //   this.clients.push(client);
  //   return client;
  // }

  //! Client Registration
  async clientRegistration(
    clientRegistrationDTO: ClientRegistrationDTO,
    file: Express.Multer.File,
  ): Promise<ClientEntity> {
    clientRegistrationDTO.profilePicture = file?.filename;
    return this.userRepository.save(clientRegistrationDTO);
  }

  // clientLogin(email: string, password: string): Client {
  //   return this.clients.find(
  //     (client) => client.email === email && client.password === password,
  //   );
  //   // if(client) {
  //   // return client;
  //   // }
  //   // else {
  //   //   return "Error! User Not Found";
  //   // }
  // }

  // updateClientProfile(
  //   id: string,
  //   updateClientProfileDTO: UpdateClientProfileDTO,
  // ): Client {
  //   const client = this.getClientById(id);

  //   if (updateClientProfileDTO.firstName !== undefined) {
  //     client.firstName = updateClientProfileDTO.firstName;
  //   }

  //   if (updateClientProfileDTO.lastName !== undefined) {
  //     client.lastName = updateClientProfileDTO.lastName;
  //   }

  //   if (updateClientProfileDTO.email !== undefined) {
  //     client.email = updateClientProfileDTO.email;
  //   }

  //   if (updateClientProfileDTO.password !== undefined) {
  //     client.password = updateClientProfileDTO.password;
  //   }

  //   if (updateClientProfileDTO.phoneNumber !== undefined) {
  //     client.phoneNumber = updateClientProfileDTO.phoneNumber;
  //   }

  //   if (updateClientProfileDTO.profilePicture !== undefined) {
  //     client.profilePicture = updateClientProfileDTO.profilePicture;
  //   }

  //   if (updateClientProfileDTO.address !== undefined) {
  //     client.address = updateClientProfileDTO.address;
  //   }

  //   if (updateClientProfileDTO.dateOfBirth !== undefined) {
  //     client.dateOfBirth = updateClientProfileDTO.dateOfBirth;
  //   }

  //   return client;
  // }

  //! Update Client Profile
  async updateClientProfile(
    id: number,
    updateClientProfileDTO: UpdateClientProfileDTO,
  ): Promise<ClientEntity> {
    // Update the user with the provided ID using the updatedUser
    //data;
    const result = await this.userRepository.update(id, updateClientProfileDTO);
    if(result.affected === 0) {
      throw new NotFoundException(`Client with ID ${id} not Found`);
    }
    // Return the updated user
    return this.userRepository.findOneBy({ id: id });
  }


  //! Update Status 
  async updateStatus(id: number, newStatus: status): Promise<ClientEntity> {
    const client = await this.userRepository.findOneBy({ id: id });
    if(!client) {
      throw new NotFoundException(`Client with ID ${id} not Found`);
    }
    else {
      client.status = newStatus;
      return this.userRepository.save(client);
    }
  }

  //! Delete Client
  // deleteClientProfile(id: string): object {
  //   const found = this.getClientById(id);
  //   this.clients = this.clients.filter((client) => client.id !== found.id);
  //   return { Message: 'Client is deleted' };
  // }

  async deleteClientProfile(id: number): Promise<string> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Client with ID ${id} not Found`);
    } else {
      return 'Client ptofile deleted successfully';
    }
  }
}
