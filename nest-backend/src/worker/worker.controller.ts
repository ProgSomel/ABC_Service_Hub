import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { WorkersService } from "./worker.service";
import { WorkersEntity } from "./worker.entity";
import { WorkerDTO } from "./dto/worker.dto";
import { AuthGuard } from "./auth/auth.guard";
import { ServiceEntity } from "src/service/services.entity";
import { ReviewEntity } from "src/review/review.entity";
import { OrderEntity } from "src/order/order.entity";

@UseGuards(AuthGuard)
@Controller('workers')
export class WorkersController {
    constructor (private workersService: WorkersService) {}

    // @Get()
    // getUsers():object {
    //     return this.workersService.getUsers();
    // }

    // @Post('createWorker')
    // @UsePipes(new ValidationPipe())
    // async createWorker(@Body() workersEntity: WorkerDTO): Promise<WorkersEntity>
    // {
    //     return this.workersService.createWorker(workersEntity);
    // }

    // @Get('findFullName/:substring')
    // async getWorkerBySubstring(@Param('substring') substring: string):Promise<WorkersEntity[]>
    // {
    //     return this.workersService.getWorkerBySubstring(substring);
    // }

    // @Get('findUsername/:username')
    // async findByUsername(@Param('username') username: string):Promise<WorkersEntity>
    // {
    //     return this.workersService.findByUsername(username);
    // }

    // @Delete('delete/:username')
    // async removeByUsername(@Param('username') username:string):Promise<string>
    // {
    //     return this.workersService.removeByUsername(username);
    
    
    // }
    
    

    // @Post('createWorker')
    // @UsePipes(new ValidationPipe())
    // async createWorker(@Body() WorkerDTO: WorkerDTO): Promise<WorkerDTO>
    // {
    //     return this.workersService.createWorker(WorkerDTO);
    // }

    @Get()
    async getAllWorkers(): Promise<WorkerDTO[]> {
        return await this.workersService.getAllWorkers();
    }

    @Get('/:id')
    async getWorkerById(@Param('id') id: number): Promise<WorkersEntity>
    {
        const worker =  await this.workersService.getWorkerById(id);

        if(!worker)
        {
            throw new NotFoundException('Worker with ID ${id} not found!!!!!!!');
        }
        return worker;
    }
    @Delete('/:id')
    async deleteWorker(@Param('id') id: number): Promise<void> {
        return await this.workersService.deleteWorker(id);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    async updateWorker(@Param('id') id: number, @Body() workerDTO: WorkerDTO): Promise<WorkersEntity>
    {
        return this.workersService.updateWorker(id, workerDTO);
    }

    @Get('available')
    async getAvailableWorkers(): Promise<WorkerDTO[]>
    {
        return this.workersService.getAvailableWorkers();
    }


    @Get('/:id/info')
    async getWorkerInfo(@Param('id') id: number): Promise<WorkersEntity>
    {
        return this.workersService.getWorkerInfo(id);
    }

    @Get('/:id/allServices')
    async getAllServices(): Promise<ServiceEntity[]> {
        return await this.workersService.getAllServices();
    }



     @Get('/:id/allServices/:serviceId')
    async getServiceById(@Param('id') id: number, @Param('serviceId') serviceId: number): Promise<ServiceEntity>
    {
        return this.workersService.getServiceById(id,serviceId);
    }
 
    // @Get('/:id/allServices/:serviceId')
    // async getServiceById(@Param('id') id: number, @Param('serviceId') serviceId: number): Promise<ServiceEntity>
    // {
    //     return this.workersService.getServiceById(id,serviceId);
    // }


    @Post('/:id/allServices/:serviceId')
    async addServiceToWorker(@Param('id') id: number, @Param('serviceId') serviceId: number): Promise<ServiceEntity>
    {
        return this.workersService.addServiceToWorker(id, serviceId);
    }



    @Get('/:id/services')
    async getServicesOfWorker(@Param('id') id: number): Promise<ServiceEntity[]>
    {
       return this.workersService.getServicesOfWorker(id);
    }

    @Delete('/:id/services/:serviceId')
    async removeServiceFromWorker(@Param('id') id: number, @Param('serviceId') serviceId: number): Promise<void>
    {
        return this.workersService.removeServiceFromWorker(id, serviceId);
    }   


    @Get('/:id/reviews')
    async getReviewsOfWorker(@Param('id') id: number): Promise<ReviewEntity[]>
    {
        return this.workersService.getReviewsOfWorker(id);
    }

 
    @Post('/:id/reviews')
    async addReviewToWorker(@Param('id') id: number, @Body() review: ReviewEntity): Promise<ReviewEntity>
    {
        return this.workersService.addReviewToWorker(id, review);
    }

    //update reviews of worker
    @Put('/:id/reviews/:reviewId')
    async updateReviewOfWorker(@Param('id') id: number, @Param('reviewId') reviewId: number, @Body() review: ReviewEntity): Promise<ReviewEntity>
    {
        return this.workersService.updateReviewOfWorker(id, reviewId, review);
    }


    @Get('/:id/orders')
    async getOrdersOfWorker(@Param('id') id: number): Promise<OrderEntity[]>
    {
        return this.workersService.getOrdersOfWorker(id);
    }


    @Post('/:id/orders')
    async addOrderToWorker(@Param('id') id: number, @Body() order: OrderEntity): Promise<OrderEntity>
    {
        return this.workersService.addOrderToWorker(id, order);
    }


    @Put('/:id/orders/:orderId')
    async updateOrderOfWorker(@Param('id') id: number, @Param('orderId') orderId: number, @Body() order: OrderEntity): Promise<OrderEntity>
    {
        return this.workersService.updateOrderOfWorker(id, orderId, order);
    }







    @Post('sendMail')

    async sendMail(): Promise<string> {
        return this.workersService.sendMail();
    }





    
    

} 