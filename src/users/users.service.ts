import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create({ email, name, password }: CreateUserDto): Promise<UserEntity> {
    /* if (
      this.userRepository.findOne({
        where: {
          email,
        },
      })
    ) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, error: 'User already exist' },
        HttpStatus.CONFLICT,
      );
    }*/

    const hashedPassword = await hash(password, 8);

    const user = this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
