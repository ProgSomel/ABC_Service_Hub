import { Injectable } from '@nestjs/common';
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
    return this.clients.find((client) => client.id === id);
  }

  getClientByIdAndUserName(id: string, userName: string): Client {
    return this.clients.find((client) => client.id === id && client.userName === userName);

  }

  clientRegistration(clientRegistrationDTO: ClientRegistrationDTO): Client {
    const {
      firstName,
      lastName,
      userName,
      email,
      profilePicture,
      phoneNumber,
      location,
      createdAt, password,
    } = clientRegistrationDTO;

    const client: Client = {
      id: uuidv4(),
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: password,
      profilePicture: profilePicture,
      phoneNumber: phoneNumber,
      location: location,
      createdAt: createdAt,
    };

    this.clients.push(client);
    return client;
  }

  clientLogin(email: string, password: string): Client {
    return this.clients.find(client => client.email === email && client.password === password);
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

  if (updateClientProfileDTO.location !== undefined) {
    client.location = updateClientProfileDTO.location;
  }

  if (updateClientProfileDTO.createdAt !== undefined) {
    client.createdAt = updateClientProfileDTO.createdAt;
  }

  return client;

  }

  deleteClientProfile(id: string): object {
    this.clients = this.clients.filter((client) => client.id !== id);
    return {Message: "Client is deleted"}
  }
}
