import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Request,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthRequest } from 'src/auth/interfaces/AuthRequest';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('movies')
@ApiBearerAuth()
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @Request() req: AuthRequest,
  ) {
    return await this.moviesService.create({
      ...createMovieDto,
      userId: req.user.id,
    });
  }

  @Get()
  async findAll() {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.moviesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.moviesService.remove(id);
  }
}
