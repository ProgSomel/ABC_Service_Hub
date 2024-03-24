import { Module } from '@nestjs/common';
import { MAuthController } from './m-auth.controller';
import { MAuthService } from './m-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ModeratorModule } from 'src/moderator/moderator.module';
import { jwtConstants } from './constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
    ModeratorModule,
  ],
  controllers: [MAuthController],
  providers: [MAuthService, LocalStrategy, JwtStrategy],
})
export class MAuthModule {}
