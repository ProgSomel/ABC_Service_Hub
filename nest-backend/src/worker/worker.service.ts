import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkersEntity } from "./worker.entity";
import { Like, Repository } from "typeorm";
import { WorkerDTO } from "./dto/worker.dto";




@Injectable()
export class WorkersService {

    constructor(@InjectRepository(WorkersEntity) private workerRepository: Repository<WorkersEntity>) {}
    
    getUsers(): object {
        return {message: 'Hello Workers'};  
    }

    // async createWorker(workersEntity: Partial<WorkersEntity>): Promise<WorkersEntity>
    // {
    //     return await this.workerRepository.save(workersEntity);
    // }

    // async getWorkerBySubstring (substring: string): Promise<WorkersEntity[]>
    // {
    //   return this.workerRepository.find({ where: { fullName: Like(`%${substring}%`) } });     }

    // async findByUsername(username: string): Promise<WorkersEntity> 
    // {
    //     return this.workerRepository.findOne({where : {username} });
    // }

    // async removeByUsername(username:string): Promise<string> 
    // {
    //   const result =  await this.workerRepository.delete({ username });

    //   if (result.affected === 0) {
    //     throw new NotFoundException(`Worker with Username ${username} not Found`);
    //   } else {
    //     return 'Worker profile deleted successfully';
    //   } 
    // } 

    async createWorker(workerDTO: WorkerDTO): Promise<WorkerDTO>
    {
        const worker =  await this.workerRepository.save(workerDTO);
        return this.workerEntityToDTO(worker);
    }

    async getAllWorkers(): Promise<WorkerDTO[]> {
        const workers = await this.workerRepository.find();
        return workers.map(worker => this.workerEntityToDTO(worker));
    }

    async getWorkerById(id: number): Promise<WorkerDTO>
    {
        const worker = await this.workerRepository.findOne({ where: { id } });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${id} not found`);
        }
        return this.workerEntityToDTO(worker);

    }

    
    async deleteWorker(id: number): Promise<void>
    {
        await this.workerRepository.delete(id);
    }










    private workerEntityToDTO(worker: WorkersEntity): WorkerDTO {
        const workerDTO = new WorkerDTO();
        workerDTO.id = worker.id;
        workerDTO.firstName = worker.firstName;
        workerDTO.lastName = worker.lastName;
        workerDTO.email = worker.email;
        workerDTO.phone = worker.phone;
        workerDTO.address = worker.address;
        workerDTO.bio = worker.bio;
        workerDTO.skills = worker.skills;
        workerDTO.hourlyRate = worker.hourlyRate;
        workerDTO.availability = worker.availability;
        return workerDTO;
      }

}