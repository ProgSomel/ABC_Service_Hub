import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WorkersService } from "src/worker/worker.service";
import { WorkerDTO, loginDTO } from "../dto/worker.dto";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { WorkersEntity } from "../worker.entity";



@Injectable()
export class AuthService {
    constructor (
        private workerService: WorkersService,
        private jwtService: JwtService
    ) {}

    async signUp(WorkerData: WorkerDTO): Promise<WorkerDTO> {
        return await this.workerService.createWorker(WorkerData);
    }

    async signIn( loginData:loginDTO): Promise<{ access_token: string }> {
    const user = await this.workerService.findOneBy(loginData);
    if (!user) {
        throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(loginData.password, user.password);
    if (!isMatch) {
          throw new UnauthorizedException();
    }
    const payload = loginData;
    return {
          access_token: await this.jwtService.signAsync(payload),
    };
      }
}