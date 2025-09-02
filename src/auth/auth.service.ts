// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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

    // Verificar si el email ya existe
    const existingUser = await this.usersRepository.findOne({ 
      where: { email },
      select: ['id', 'email']
    });
    if (existingUser) {
      throw new BadRequestException('El correo electrónico ya está en uso.');
    }

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
    const user = await this.usersRepository.findOne({ 
      where: { email },
      select: ['id', 'email', 'password', 'role', 'full_name']
    });
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
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
    };
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.usersRepository.findOne({ 
      where: { id: userId },
      select: ['id', 'email', 'role', 'hashed_refresh_token']
    });

    // Verificar si el usuario existe y si el token de refresco en la BD coincide
    if (!user || !user.hashed_refresh_token) {
      throw new UnauthorizedException('Usuario no autorizado.');
    }

    const isMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Token de refresco inválido.');
    }

    // Generar un nuevo token de acceso
    const newAccessToken = this.jwtService.sign({
      email: user.email,
      sub: user.id,
      role: user.role,
    }, { expiresIn: '15m' });

    return {
      access_token: newAccessToken,
    };
  }

  // Este es el método que usaste para generar el token de refresco, lo mantendremos para el endpoint 'request-refresh-token'
  async createRefreshToken(userId: string) {
    const user = await this.usersRepository.findOne({ 
      where: { id: userId },
      select: ['id', 'email', 'role', 'hashed_refresh_token']
    });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado.');
    }

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '7d' },
    );
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    user.hashed_refresh_token = hashedRefreshToken;
    await this.usersRepository.save(user);

    return {
      refresh_token: refreshToken,
    };
  }

  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({ 
      where: { email },
      select: ['id', 'email', 'reset_token', 'reset_token_expires_at']
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    const resetToken = uuidv4();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 3600000); // 1 hour

    user.reset_token = resetToken;
    user.reset_token_expires_at = expiresAt;
    await this.usersRepository.save(user);

    await this.mailService.sendPasswordResetEmail(user.email, resetToken);
  }

  async resetPassword(token: string, newPassword?: string): Promise<void> {
    if (!newPassword || newPassword.length < 8) {
      throw new BadRequestException(
        'La nueva contraseña debe tener al menos 8 caracteres.',
      );
    }

    const user = await this.usersRepository.findOne({
      where: { reset_token: token },
      select: ['id', 'email', 'password', 'reset_token', 'reset_token_expires_at']
    });

    const now = new Date();
    if (
      !user ||
      !user.reset_token_expires_at ||
      now > user.reset_token_expires_at
    ) {
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
