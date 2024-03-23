import { Module } from "@nestjs/common";
import { WorkersController } from "./worker.controller";
import { WorkersService } from "./worker.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorkersEntity } from "./worker.entity";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth/auth.service";
import { ClientEntity } from "src/clients/clients.entity";
import { ServiceEntity } from "src/service/services.entity";
import { ReviewEntity } from "src/review/review.entity";
import { OrderEntity } from "src/order/order.entity";
import { WorkerInfoEntity } from "./workerInfo.entity";


@Module({
    imports: [TypeOrmModule.forFeature([WorkersEntity, ClientEntity, ServiceEntity, ReviewEntity,OrderEntity, ReviewEntity, WorkerInfoEntity]),
    
    JwtModule.register({
        global: true,
        secret: "3NP_Backend_ABCService",
        signOptions: {expiresIn: '30m'},
    }),
    
    ],
    controllers: [WorkersController],
    providers: [WorkersService, AuthService],
    exports: [WorkersService]
})
export class WorkersModule{}
