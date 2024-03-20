import { Injectable } from '@nestjs/common';
import { ModeratorDto } from './dto/moderator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Moderator } from './entities/moderator.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModeratorService {
  constructor(@InjectRepository(Moderator) private moderatorRepository: Repository<Moderator>) {}
  create(moderatorDto: ModeratorDto) {
    return this.moderatorRepository.create(moderatorDto);
  }

  findAll() {
    return this. moderatorRepository.find();
  }

  findOne(id: number) {
    return this.moderatorRepository.findOne({ where: { id } });
  }

  update(id: number, moderatorDto: ModeratorDto) {
    return this.moderatorRepository.update(id, moderatorDto);
  }

  remove(id: number) {
    return this.moderatorRepository.delete(id);
  }
}
