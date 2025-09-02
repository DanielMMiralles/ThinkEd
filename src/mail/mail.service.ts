// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('ETHEREAL_HOST'),
      port: this.configService.get<number>('ETHEREAL_PORT'),
      secure: false,
      requireTLS: true, // Forzar TLS para conexión segura
      tls: {
        rejectUnauthorized: false // Solo para desarrollo, usar true en producción
      },
      auth: {
        user: this.configService.get<string>('ETHEREAL_USER'),
        pass: this.configService.get<string>('ETHEREAL_PASS'),
      },
    });
  }

  private sanitizeToken(token: string): string {
    // Sanitizar token para prevenir XSS
    return token.replace(/[<>"'&]/g, '');
  }

  async sendPasswordResetEmail(email: string, token: string) {
    try {
      const sanitizedToken = this.sanitizeToken(token);
      const resetUrl = `http://localhost:3000/auth/reset-password?token=${encodeURIComponent(sanitizedToken)}`;

      await this.transporter.sendMail({
        from: '"ThinkEd" <damm172004@gmail.com>',
        to: email,
        subject: 'Restablecer Contraseña',
        html: `
          <p>Hola,</p>
          <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
          <a href="${resetUrl}">Restablecer Contraseña</a>
          <p>Este enlace expirará en media hora.</p>
        `,
      });
    } catch (error) {
      throw new Error('Error al enviar el correo de restablecimiento');
    }
  }
}