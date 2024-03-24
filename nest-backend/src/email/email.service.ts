import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { EmailDto } from './dto/email.dto';
import { user } from './constant.email';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}
  async sendEmail(mail: EmailDto) {
    console.log('Sending email...');
    return await this.mailerService.sendMail({
      to: mail.to,
      from: user,
      subject: mail.subject,
      text: mail.text,
    });
  }
}
