import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido.' })
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío.' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  password: string;
}