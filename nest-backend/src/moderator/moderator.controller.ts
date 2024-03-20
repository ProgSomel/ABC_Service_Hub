import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { ModeratorDto } from './dto/moderator.dto';

@Controller('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  @Post()
  create(@Body() moderatorDto: ModeratorDto) {
    return this.moderatorService.create(moderatorDto);
  }

  @Get()
  findAll() {
    return this.moderatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moderatorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() moderatorDto: ModeratorDto) {
    return this.moderatorService.update(+id, moderatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moderatorService.remove(+id);
  }
}
