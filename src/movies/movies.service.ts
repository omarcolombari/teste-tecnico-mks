import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
  async create(createMovieDto: CreateMovieDto): Promise<MovieEntity> {
    const movie = this.movieRepository.create(createMovieDto);
    return await this.movieRepository.save(movie);
  }

  async findAll(): Promise<MovieEntity[]> {
    const cacheKey = 'movies:all';
    const cachedMovies = await this.cacheManager.get<string>(cacheKey);

    if (cachedMovies) {
      return JSON.parse(cachedMovies);
    }

    const movies = await this.movieRepository.find();
    await this.cacheManager.set(cacheKey, JSON.stringify(movies));

    return movies;
  }

  async findOne(id: string): Promise<MovieEntity> {
    const cacheKey = `movie:${id}`;
    const cachedMovie = await this.cacheManager.get<string>(cacheKey);

    if (cachedMovie) {
      return JSON.parse(cachedMovie);
    }

    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    await this.cacheManager.set(cacheKey, JSON.stringify(movie));

    return movie;
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    this.movieRepository.merge(movie, updateMovieDto);
    return await this.movieRepository.save(movie);
  }

  async remove(id: string) {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    await this.movieRepository.delete({ id });
  }
}
