import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { WorkersService } from "./worker.service";
import { WorkersEntity } from "./worker.entity";
import { WorkerDTO } from "./dto/worker.dto";
import { AuthGuard } from "./auth/auth.guard";


@Controller('workers')
export class WorkersController {
    constructor (private workersService: WorkersService) {}

    @UseGuards(AuthGuard)
    @Get()
    getUsers():object {
        return this.workersService.getUsers();
    }

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

    @Get('allWorkers')
    async getAllWorkers(): Promise<WorkerDTO[]> {
        return await this.workersService.getAllWorkers();
    }

    @Get('allWorkers/:id')
    async getWorkerById(@Param('id') id: number): Promise<WorkerDTO>
    {
        const worker =  await this.workersService.getWorkerById(id);

        if(!worker)
        {
            throw new NotFoundException('Worker with ID ${id} not found!!!!!!!');
        }
        return worker;
    }
    @Delete('deleteWorker/:id')
    async deleteWorker(@Param('id') id: number): Promise<void> {
        return await this.workersService.deleteWorker(id);
    }



    

} 