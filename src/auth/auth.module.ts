// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { JwtStrategy } from './jwt.strategy'; // Importa la nueva estrategia
import { RolesGuard } from './roles.guard';
import { MailModule } from 'src/mail/mail.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'Adridan417*',
      signOptions: { expiresIn: '1h' },
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard], 
  exports: [AuthService, JwtModule, PassportModule], 
})
export class AuthModule {}