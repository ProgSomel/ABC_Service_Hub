import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { MAuthPayloadDto } from 'src/m-auth/auth.dto';
import { MAuthService } from './m-auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt.guard';

@Controller('m-auth')
export class MAuthController {
  constructor(private mAuthService: MAuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Body() authPayload: MAuthPayloadDto) {
    const user = this.mAuthService.validateUser(authPayload);
    return user;
  }
  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    console.log('Inside AuthController status method');
  }
}
