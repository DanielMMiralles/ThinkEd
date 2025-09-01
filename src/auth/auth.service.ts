// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto'; 
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  // Método para registrar un nuevo usuario
  async register(registerDto: RegisterDto): Promise<User> {
    const { full_name, email, password } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      full_name,
      email,
      password: hashedPassword,
      role: 'estudiante', 
    });

    return this.usersRepository.save(newUser);
  }

  // Método para validar las credenciales de un usuario
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Método para iniciar sesión y generar un token JWT
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    const resetToken = uuidv4();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 3600000); // 1 hour

    user.reset_token = resetToken;
    user.reset_token_expires_at = expiresAt;
    await this.usersRepository.save(user);

    await this.mailService.sendPasswordResetEmail(user.email, resetToken); // ✅ Call the email service
  }


  async resetPassword(token: string, newPassword?: string): Promise<void> {
    if (!newPassword || newPassword.length < 8) {
      throw new BadRequestException('La nueva contraseña debe tener al menos 8 caracteres.');
    }

    const user = await this.usersRepository.findOne({
      where: { reset_token: token },
    });

    const now = new Date();
    if (!user || !user.reset_token_expires_at || now > user.reset_token_expires_at) {
      throw new BadRequestException('El token no es válido o ha expirado.');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.reset_token = null; // Invalida el token
    user.reset_token_expires_at = null; // Borra la fecha de expiración

    await this.usersRepository.save(user);
  }


}