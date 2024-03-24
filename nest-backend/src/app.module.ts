import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeORM.config';
import { WorkersModule } from './worker/worker.module';
import { ModeratorModule } from './moderator/moderator.module';
import { MAuthModule } from './m-auth/m-auth.module';
import { EmailModule } from './email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { password, user } from './email/constant.email';

@Module({
  imports: [
    WorkersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ModeratorModule,
    MAuthModule,
    EmailModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: user,
          pass: password,
        },
      },
    }),
  ],
})
export class AppModule {}
