import { Body, Controller, Post, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { WorkerDTO, loginDTO } from "../dto/worker.dto";
import * as bcrypt from 'bcrypt';


@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

    // @Post('register')
    // @UseInterceptors(FileInterceptor('myfile',
    //     {
    //         fileFilter: (req, file, cb) => {
    //             if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
    //                 cb(null, true);
    //             else {
    //                 cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    //             }
    //         },
    //         limits: { fileSize: 30000 },
    //         storage: diskStorage({
    //             destination: './upload',
    //             filename: function (req, file, cb) {
    //                 cb(null, Date.now() + file.originalname)
    //             },
    //         })
    //     }
    // ))
    // @UsePipes(new ValidationPipe)
    // async addUser(@Body() myobj: WorkerDTO, @UploadedFile() myfile: Express.Multer.File): Promise<WorkerDTO> {
    //   const salt = await bcrypt.genSalt();
    //   const hashedpassword = await bcrypt.hash(myobj.password, salt); 
    //   myobj.password= hashedpassword;
    //   myobj.filename = myfile.filename;
    //     return this.authService.signUp(myobj);
    // }

    @Post('register')
    async createWorker(@Body() WorkerData: WorkerDTO) : Promise<WorkerDTO> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(WorkerData.password, salt);
        WorkerData.password = hashedPassword;
        return this.authService.signUp(WorkerData);
    }

    @Post('login')
    signIn(@Body() loginData: loginDTO) {
        return this.authService.signIn(loginData);
    }


}