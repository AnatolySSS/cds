import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { IEmailService } from '../../domain/services/email.service.interface';

@Injectable()
export class EmailService implements IEmailService {
  private transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // STARTTLS
    // host: process.env.SMTP_HOST,
    // port: Number(process.env.SMTP_PORT) || 587,
    // secure: false, // true только для 465
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
    logger: true,
    debug: true,
    connectionTimeout: 5000, // время на установку TCP (5 сек)
    greetingTimeout: 5000, // ожидание ответа сервера
    socketTimeout: 5000, // общее время жизни сокета
  });

  async sendCredentials(email: string, password: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Ваш доступ к системе',
      text: `Ваш пароль: ${password}`,
    });
  }
}
