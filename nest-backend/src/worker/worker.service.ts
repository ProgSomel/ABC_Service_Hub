import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkersEntity } from "./worker.entity";
import { Like, Repository } from "typeorm";
import { WorkerDTO, loginDTO } from "./dto/worker.dto";
import { JwtService } from "@nestjs/jwt";
import { ServiceEntity } from "src/service/services.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { ReviewEntity } from "src/review/review.entity";
import { OrderEntity } from "src/order/order.entity";
import { WorkerInfoEntity } from "./workerInfo.entity";




@Injectable()
export class WorkersService {

    constructor(@InjectRepository(WorkersEntity) 
    private workerRepository: Repository<WorkersEntity>,
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(WorkerInfoEntity)
    private workerInfoRepository: Repository<WorkerInfoEntity>,

    private mailerService: MailerService,
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

    async createWorker(workerDTO: WorkerDTO,
      file:Express.Multer.File,
      ): Promise<WorkersEntity> {
        const worker = new WorkersEntity();
        worker.id = workerDTO.id;
        worker.name = workerDTO.name;
        worker.email = workerDTO.email;
        worker.password = workerDTO.password;
        worker.imageUrl = workerDTO.imageUrl;
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

    async getWorkerInfo(id: number): Promise<WorkersEntity> {
        const worker = await this.workerRepository.findOne({ where: { id }, relations: ['workerInfo'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${id} not found`);
        }
        return worker;
      }


    async getAvailableWorkers(): Promise<WorkersEntity[]> {
        return await this.workerRepository.find({ where: { availability: true } });
    }

    async getAllServices(): Promise<ServiceEntity[]> {
        return await this.serviceRepository.find();
    }

   //see specific service and it's associated workers
   async getServiceById(id: number, serviceId: number): Promise<ServiceEntity> {
    const service = await this.serviceRepository.findOne({ where: { serviceId }, relations: ['workers'] });
    if (!service) {
      throw new NotFoundException(`Service with ID ${serviceId} not found`);
    }
    return service;
  }

    async addServiceToWorker(workerId: number, serviceId: number): Promise<ServiceEntity> {
      const worker = await this.workerRepository.findOne({ where: {id: workerId}, relations: ['services'] });

      const service = await this.serviceRepository.findOne({ where: {serviceId: serviceId}, relations: ['workers'] });


      if (service && worker){
        worker.services.push(service);
        await this.workerRepository.save(worker);
        return service;
      }
      else{
        throw new NotFoundException(`Service with ID ${serviceId} not found`);
        }
      }

      async getServicesOfWorker(workerId: number): Promise<ServiceEntity[]> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['services'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        return worker.services;
      }

      // //remove specific service from worker and it will return the updated worker with the service removed
      // async removeServiceFromWorker(workerId: number, serviceId: number): Promise<WorkersEntity> {
      //   const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['services'] });
      //   const service = await this.serviceRepository.findOne({ where: { serviceId: serviceId } });
      //   if (!worker) {
      //     throw new NotFoundException(`Worker with ID ${workerId} not found`);
      //   }
      //   if (!service) {
      //     throw new NotFoundException(`Service with ID ${serviceId} not found`);
      //   }
      //   worker.services = worker.services.filter(service => service.serviceId !== serviceId);
      //   return await this.workerRepository.save(worker);
      // }

      async removeServiceFromWorker(workerId: number, serviceId: number): Promise<void> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['services'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
    
        const serviceIndex = worker.services.findIndex(service => service.serviceId === serviceId);
        if (serviceIndex === -1) {
          throw new NotFoundException(`Service with ID ${serviceId} not found for worker`);
        }
    
        worker.services.splice(serviceIndex, 1);
        await this.workerRepository.save(worker);
      }


      async getReviewsOfWorker(workerId: number): Promise<ReviewEntity[]> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['reviews'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        return worker.reviews;
      }


      async addReviewToWorker(workerId: number, review: ReviewEntity): Promise<ReviewEntity> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['reviews'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        review.worker = worker;
        return await this.reviewRepository.save(review);
      }

      async updateReviewOfWorker(workerId: number, reviewId: number, review: ReviewEntity): Promise<ReviewEntity> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['reviews'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
    
        const reviewIndex = worker.reviews.findIndex(review => review.id === reviewId);
        if (reviewIndex === -1) {
          throw new NotFoundException(`Review with ID ${reviewId} not found for worker`);
        }
    
        worker.reviews[reviewIndex] = review;
        return await this.reviewRepository.save(review);
      }

      async getOrdersOfWorker(workerId: number): Promise<OrderEntity[]> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['orders'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        return worker.orders;
      }

      async addOrderToWorker(workerId: number, order: OrderEntity): Promise<OrderEntity> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['orders'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        order.worker = worker;
        return await this.orderRepository.save(order);
      }


    async updateOrderOfWorker(workerId: number, orderId: number, order: OrderEntity): Promise<OrderEntity> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['orders'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
    
        const orderIndex = worker.orders.findIndex(order => order.orderId === orderId);
        if (orderIndex === -1) {
          throw new NotFoundException(`Order with ID ${orderId} not found for worker`);
        }
    
        worker.orders[orderIndex] = order;
        return await this.orderRepository.save(order);
      }









      async sendMail(): Promise<string> {
        await this.mailerService.sendMail({
          to: 'abdullahashik2001@gmail.com',
          subject: 'Mailer Testing',
          text: 'Hello, This is a test mail from NestJS application',
          });
        return 'Mail sent successfully';
      }




///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


      async findOneBy( logindata:loginDTO): Promise<any> {
        return await this.workerRepository.findOneBy({email:logindata.email});
      }

}