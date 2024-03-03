import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from './clients.model';
import { ClientRegistrationDTO } from './dto/clientRegistrationDTO';
import { v4 as uuidv4 } from 'uuid';
import { UpdateClientProfileDTO } from './dto/updateClientProfileDTO';

@Injectable()
export class ClientsService {
  private clients: Client[] = [];

  getAllClients(): Client[] {
    return this.clients;
  }

  getClientById(id: string): Client {
    const found = this.clients.find((client) => client.id === id);
    if (!found) {
      throw new NotFoundException('!Client Not Found');
    }
    return found;
  }

  getClientByIdAndUserName(id: string, userName: string): Client {
    return this.clients.find(
      (client) => client.id === id && client.userName === userName,
    );
  }

  clientRegistration(
    clientRegistrationDTO: ClientRegistrationDTO,
    file: Express.Multer.File,
  ): Client {
    const {
      firstName,
      lastName,
      userName,
      email,
      fbLinks,
      phoneNumber,
      address,
      dateOfBirth,
      password,
    } = clientRegistrationDTO;

    const client: Client = {
      id: uuidv4(),
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      address: address,
      dateOfBirth: dateOfBirth,
      fbLinks: fbLinks,
      profilePicture: file?.filename,
    };

    this.clients.push(client);
    return client;
  }

  clientLogin(email: string, password: string): Client {
    return this.clients.find(
      (client) => client.email === email && client.password === password,
    );
    // if(client) {
    // return client;
    // }
    // else {
    //   return "Error! User Not Found";
    // }
  }

  updateClientProfile(
    id: string,
    updateClientProfileDTO: UpdateClientProfileDTO,
  ): Client {
    const client = this.getClientById(id);

    if (updateClientProfileDTO.firstName !== undefined) {
      client.firstName = updateClientProfileDTO.firstName;
    }

    if (updateClientProfileDTO.lastName !== undefined) {
      client.lastName = updateClientProfileDTO.lastName;
    }

    if (updateClientProfileDTO.email !== undefined) {
      client.email = updateClientProfileDTO.email;
    }

    if (updateClientProfileDTO.password !== undefined) {
      client.password = updateClientProfileDTO.password;
    }

    if (updateClientProfileDTO.phoneNumber !== undefined) {
      client.phoneNumber = updateClientProfileDTO.phoneNumber;
    }

    if (updateClientProfileDTO.profilePicture !== undefined) {
      client.profilePicture = updateClientProfileDTO.profilePicture;
    }

    if (updateClientProfileDTO.address !== undefined) {
      client.address = updateClientProfileDTO.address;
    }

    if (updateClientProfileDTO.dateOfBirth !== undefined) {
      client.dateOfBirth = updateClientProfileDTO.dateOfBirth;
    }

    return client;
  }

  deleteClientProfile(id: string): object {
    const found = this.getClientById(id);
    this.clients = this.clients.filter((client) => client.id !== found.id);
    return { Message: 'Client is deleted' };
  }
}
