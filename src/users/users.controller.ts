import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  async store(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
