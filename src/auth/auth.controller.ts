import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './interfaces/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest, @Body() loginUserDto: LoginUserDto) {
    return this.authService.login(req.user);
  }
}
