import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    example: 'Um sonho de liberdade',
    description: 'Nome do filme',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 144,
    description: 'Duração do filme em minutos',
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    example: '16',
    description: 'Classificação do filme',
  })
  @IsString()
  classification: string;

  @ApiProperty({
    example:
      'Andy Dufresne é condenado a duas prisões perpétuas consecutivas pelas mortes de sua esposa e de seu amante...',
    description: 'Sinopse do filme',
  })
  @IsString()
  synopsis: string;

  @ApiProperty({
    example: 'Drama/Ficção policial',
    description: 'Gênero do filme',
  })
  @IsString()
  genres: string;

  @ApiProperty({
    description:
      'Não é necessário passar no corpo da requisição, essa informação será capturado de acordo com o usuário logado',
  })
  userId: string;
}
