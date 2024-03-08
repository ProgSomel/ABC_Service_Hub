import { Module } from "@nestjs/common";
import { WorkersController } from "./worker.controller";
import { WorkersService } from "./worker.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorkersEntity } from "./worker.entity";

@Module({
    imports: [TypeOrmModule.forFeature([WorkersEntity]),],
    controllers: [WorkersController],
    providers: [WorkersService]
})
export class WorkersModule{}