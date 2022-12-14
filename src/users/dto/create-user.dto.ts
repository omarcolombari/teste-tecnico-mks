import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  /**
   * Será o nome visível a todos.
   * @example Omar Colombari
   */
  @IsString()
  name: string;

  /**
   * O e-mail é necessário para o login e contato.
   * @example email@email.com
   */
  @IsEmail()
  email: string;

  /**
   * Senha necessária para login, com no mínimo 4 caracteres e no máximo 20.
   * @example Abc123@
   */
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
