import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { MAuthService } from './m-auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: MAuthService) {
    super();
  }

  validate(username: string, password: string) {
    console.log('Inside LocalStrategy');
    const user = this.authService.validateUser({ username, password });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}