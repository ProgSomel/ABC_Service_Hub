import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../m-auth/jwt.guard';
import { EmailDto } from './dto/email.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async sendEmail(@Body() email: EmailDto) {
    return await this.emailService.sendEmail(email);
  }
}
