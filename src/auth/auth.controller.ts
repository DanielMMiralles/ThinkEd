// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body('email') email: string): Promise<void> {
    await this.authService.requestPasswordReset(email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body('token') token: string, @Body('password') password: string): Promise<void> {
    await this.authService.resetPassword(token, password);
  }

    //Endpoint para solicitar el token de refresco
  @Post('request-refresh-token')
  @HttpCode(HttpStatus.OK)
  async requestRefreshToken(@Body('userId') userId: string) {
    return this.authService.createRefreshToken(userId);
  }

  // Endpoint para usar el token de refresco y obtener uno nuevo de acceso
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body('userId') userId: string, @Body('refreshToken') refreshToken: string) {
    if (!userId || !refreshToken) {
      throw new BadRequestException('Se requieren userId y refreshToken.');
    }
    return this.authService.refreshToken(userId, refreshToken);
  }
}