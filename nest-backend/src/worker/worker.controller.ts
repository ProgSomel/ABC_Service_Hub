import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { WorkersService } from "./worker.service";
import { WorkersEntity } from "./worker.entity";
import { WorkerDTO } from "./dto/worker.dto";
import { AuthGuard } from "./auth/auth.guard";
import { ServiceEntity } from "src/service/services.entity";

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

    @Get('/:id/services')
    async getAllServices(): Promise<ServiceEntity[]> {
        return await this.workersService.getAllServices();
    }

    @Get('/:id/services/:serviceId')
    async getServiceById(@Param('serviceId') serviceId: number): Promise<ServiceEntity>
    {
        const service =  await this.workersService.getServiceById(serviceId);

        if(!service)
        {
            throw new NotFoundException('Service with ID ${serviceId} not found!!!!!!!');
        }
        return service;
    }

    @Post('/:id/services/:serviceId')
    async addServiceToWorker(@Param('id') id: number, @Body('serviceId') serviceId: number): Promise<WorkersEntity>
    {
        return this.workersService.addServiceToWorker(id, serviceId);
    }

    @Delete('/:id/services/:serviceId')
    async removeServiceFromWorker(@Param('id') id: number, @Param('serviceId') serviceId: number): Promise<WorkersEntity>
    {
        return this.workersService.removeServiceFromWorker(id, serviceId);
    }

    
    

} 