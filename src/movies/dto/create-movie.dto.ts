import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsString()
  classification: string;

  @IsString()
  synopsis: string;

  @IsString()
  genres: string;
}
