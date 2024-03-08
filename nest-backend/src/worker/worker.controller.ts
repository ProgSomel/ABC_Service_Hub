import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { WorkersService } from "./worker.service";
import { WorkersEntity } from "./worker.entity";
import { WorkerDTO } from "./dto/worker.dto";


@Controller('workers')
export class WorkersController {
    constructor (private workersService: WorkersService) {}

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

    

} 