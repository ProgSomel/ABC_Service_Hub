import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkersEntity } from "./worker.entity";
import { Like, Repository } from "typeorm";
import { WorkerDTO, loginDTO } from "./dto/worker.dto";
import { JwtService } from "@nestjs/jwt";
import { ServiceEntity } from "src/service/services.entity";




@Injectable()
export class WorkersService {

    constructor(@InjectRepository(WorkersEntity) 
    private workerRepository: Repository<WorkersEntity>,
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    private jwtService : JwtService) {}
    
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

    async createWorker(workerDTO: WorkerDTO): Promise<WorkersEntity> {
        const worker = new WorkersEntity();
        worker.id = workerDTO.id;
        worker.name = workerDTO.name;
        worker.email = workerDTO.email;
        worker.password = workerDTO.password;
        // worker.phone = workerDTO.phone;
        // worker.address = workerDTO.address;
        // worker.bio = workerDTO.bio;
       // worker.skills = workerDTO.skills;
        worker.hourlyRate = workerDTO.hourlyRate;
        worker.availability = workerDTO.availability;

     
        return await this.workerRepository.save(worker);
      }

    async getAllWorkers(): Promise<WorkersEntity[]> {
        const workers = await this.workerRepository.find();
        return workers;
    }

    async getWorkerById(id: number): Promise<WorkersEntity>
    {
        const worker = await this.workerRepository.findOne({ where: { id } });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${id} not found`);
        }
        return worker;

    }
    
    async deleteWorker(id: number): Promise<void>
    {
        await this.workerRepository.delete(id);
    }


    async updateWorker(id: number, workerDTO: WorkerDTO): Promise<WorkersEntity>
    {
        const worker = await this.workerRepository.findOne({ where: { id }});
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${id} not found`);
        }
        worker.name = workerDTO.name;
        worker.email = workerDTO.email;
        // worker.phone = workerDTO.phone;
        // worker.address = workerDTO.address;
        // worker.bio = workerDTO.bio;
        //worker.skills = workerDTO.skills;
        worker.hourlyRate = workerDTO.hourlyRate;
        worker.availability = workerDTO.availability;
        return await this.workerRepository.save(worker);
    }

    async getAllServices(): Promise<ServiceEntity[]> {
        return await this.serviceRepository.find();
    }

    async getServiceById(serviceId: number): Promise<ServiceEntity> {
        const service = await this.serviceRepository.findOne({ where: { serviceId } });
        if (!service) {
          throw new NotFoundException(`Service with ID ${serviceId} not found`);
        }
        return service;
    }

    async addServiceToWorker(workerId: number, serviceId: number): Promise<WorkersEntity> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId } });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        const service = await this.serviceRepository.findOne({ where: { serviceId: serviceId } });
        if (!service) {
          throw new NotFoundException(`Service with ID ${serviceId} not found`);
        }
        worker.services.push(service);
        return await this.workerRepository.save(worker);
      }

      async removeServiceFromWorker(workerId: number, serviceId: number): Promise<WorkersEntity> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId } });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        const service = await this.serviceRepository.findOne({ where: { serviceId: serviceId } });
        if (!service) {
          throw new NotFoundException(`Service with ID ${serviceId} not found`);
        }
        worker.services = worker.services.filter(s => s.serviceId !== serviceId);
        return await this.workerRepository.save(worker);
      }




///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


      async findOneBy( logindata:loginDTO): Promise<any> {
        return await this.workerRepository.findOneBy({email:logindata.email});
      }

}