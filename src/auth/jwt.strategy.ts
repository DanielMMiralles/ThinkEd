// src/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestWithUser } from '../common/interfaces/request-with-user.interface'; // Importa la interfaz

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'Adridan417*', // Usa la misma clave secreta que en jwt.module.ts
    });
  }

  async validate(payload: any) {
    // En un proyecto real, buscarías al usuario en la base de datos para asegurarte de que existe.
    // Por ahora, solo devolvemos el payload del token.
    return { userId: payload.sub, email: payload.email };
  }
}