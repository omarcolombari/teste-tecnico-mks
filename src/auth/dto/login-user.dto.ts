import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
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
  password: string;
}
