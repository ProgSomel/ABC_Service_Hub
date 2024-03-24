import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { ModeratorDto } from './dto/moderator.dto';
import { WorkerDTO } from 'src/worker/dto/worker.dto';
import { JwtAuthGuard } from 'src/m-auth/jwt.guard';
import { ClientEntity } from 'src/clients/clients.entity';

@Controller('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() moderatorDto: ModeratorDto) {
    return this.moderatorService.create(moderatorDto);
  }
  @Post('createWorker')
  @UseGuards(JwtAuthGuard)
  createWorker(@Body() WorkerDTO: WorkerDTO): Promise<WorkerDTO> {
    return this.moderatorService.createWorker(WorkerDTO);
  }
  @Post('createClient')
  @UseGuards(JwtAuthGuard)
  createClient(@Body() ClientDTO: ClientEntity): Promise<ClientEntity> {
    return this.moderatorService.createClient(ClientDTO);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.moderatorService.findAll();
  }
  @Get('workers')
  @UseGuards(JwtAuthGuard)
  findworkers() {
    return this.moderatorService.findworkers();
  }
  @Get('clients')
  @UseGuards(JwtAuthGuard)
  findClients() {
    return this.moderatorService.findClients();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.moderatorService.findOne(+id);
  }
  @Get('Worker/:id')
  @UseGuards(JwtAuthGuard)
  findWorker(@Param('id') id: string) {
    return this.moderatorService.findWorker(+id);
  }
  @Get('Client/:id')
  @UseGuards(JwtAuthGuard)
  findClient(@Param('id') id: string) {
    return this.moderatorService.findClient(+id);
  }
  

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() moderatorDto: ModeratorDto) {
    return this.moderatorService.update(+id, moderatorDto);
  }
  @Patch('allWorkers/:id')
  @UseGuards(JwtAuthGuard)
  updateWorker(@Param('id') id: string, @Body() WorkerDTO: WorkerDTO) {
    return this.moderatorService.updateWorker(+id, WorkerDTO);
  }
  @Patch('allClients/:id')
  @UseGuards(JwtAuthGuard)
  updateClient(@Param('id') id: string, @Body() ClientDTO: ClientEntity) {
    return this.moderatorService.updateClient(+id, ClientDTO);
  }
}
