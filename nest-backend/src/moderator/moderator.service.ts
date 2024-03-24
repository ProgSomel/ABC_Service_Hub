import { Injectable } from '@nestjs/common';
import { ModeratorDto } from './dto/moderator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Moderator } from './entities/moderator.entity';
import { Repository } from 'typeorm';
import { WorkersEntity } from '../worker/worker.entity';
import { WorkerDTO } from 'src/worker/dto/worker.dto';
import { ClientEntity } from 'src/clients/clients.entity';
import { saltOrRounds } from '../m-auth/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ModeratorService {
  getModeratorByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Moderator)
    private moderatorRepository: Repository<Moderator>,

    @InjectRepository(WorkersEntity)
    private workerRepository: Repository<WorkersEntity>,

    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  create(moderatorDto: ModeratorDto) {
    moderatorDto.password = bcrypt.hashSync(
      moderatorDto.password,
      saltOrRounds,
    );
    return this.moderatorRepository.save(moderatorDto);
  }
  createWorker(WorkerDTO: WorkerDTO) {
    return this.workerRepository.save(WorkerDTO);
  }
  createClient(ClientDTO: ClientEntity) {
    return this.clientRepository.save(ClientDTO);
  }

  findAll() {
    return this.moderatorRepository.find();
  }
  findworkers() {
    return this.workerRepository.find();
  }
  findClients() {
    return this.clientRepository.find();
  }

  findOne(id: number) {
    return this.moderatorRepository.findOne({ where: { id } });
  }
  findWorker(id: number) {
    return this.workerRepository.findOne({ where: { id } });
  }
  findClient(id: number) {
    return this.clientRepository.findOne({ where: { id } });
  }
  async findModeratorByUsername(userName: string) {
    const m = await this.moderatorRepository.findOne({ where: { userName } });
    return m;
  }

  update(id: number, moderatorDto: ModeratorDto) {
    moderatorDto.password = bcrypt.hashSync(
      moderatorDto.password,
      saltOrRounds,
    );
    return this.moderatorRepository.update(id, moderatorDto);
  }
  updateWorker(id: number, WorkerDTO: WorkerDTO) {
    return this.workerRepository.update(id, WorkerDTO);
  }
  updateClient(id: number, ClientDTO: ClientEntity) {
    return this.clientRepository.update(id, ClientDTO);
  }

  remove(id: number) {
    return this.moderatorRepository.delete(id);
  }
  removeWorker(id: number) {
    return this.workerRepository.delete(id);
  }
  removeClient(id: number) {
    return this.clientRepository.delete(id);
  }
}
