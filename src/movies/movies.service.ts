import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(private readonly movieRepository: Repository<MovieEntity>) {}
  async create(createMovieDto: CreateMovieDto): Promise<MovieEntity> {
    const movie = this.movieRepository.create(createMovieDto);
    return await this.movieRepository.save(movie);
  }

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find();
  }

  async findOne(id: string): Promise<MovieEntity> {
    return this.movieRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException();
    }

    this.movieRepository.merge(movie, updateMovieDto);
    return await this.movieRepository.save(movie);
  }

  async remove(id: string) {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException();
    }

    await this.movieRepository.softDelete({ id });
  }
}
