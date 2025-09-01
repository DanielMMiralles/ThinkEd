// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'doyle.klocko@ethereal.email',
        pass: 'zztsB5vr4XDYwadj8f'
      },
    });
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`; // You'll replace this with your frontend URL later

    await this.transporter.sendMail({
      from: '"ThinkEd" <damm172004@gmail.com>',
      to: email,
      subject: 'Restablecer Contraseña',
      html: `
        <p>Hola,</p>
        <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>Este enlace expirará en media hora.</p>
      `,
    });
  }
}