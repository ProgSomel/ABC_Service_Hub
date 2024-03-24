import { Injectable, NotAcceptableException } from '@nestjs/common';
import { MAuthPayloadDto } from 'src/m-auth/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ModeratorService } from 'src/moderator/moderator.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MAuthService {
  constructor(
    private moderatorService: ModeratorService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: MAuthPayloadDto) {
    const mod = await this.moderatorService.findModeratorByUsername(username);
    const compare = await bcrypt.compare(password, mod.password);
    if (!mod) return new NotAcceptableException('User not found');
    else if (!compare) return new NotAcceptableException('Incorrect password');
    else if (mod && compare) {
      const payload = { userName: mod.userName, id: mod.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }
    async loginWithCredentials(user: any) {
  }
}
