import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.transporter =
      nodemailer.createTransport({
        host: this.configService.getOrThrow<string>(
          'MAILTRAP_HOST',
        ),

        port: Number(
          this.configService.getOrThrow<string>(
            'MAILTRAP_PORT',
          ),
        ),

        secure: false,

        auth: {
          user:
            this.configService.getOrThrow<string>(
              'MAILTRAP_USER',
            ),

          pass:
            this.configService.getOrThrow<string>(
              'MAILTRAP_PASSWORD',
            ),
        },
      });
  }

  async sendLoginOtp(
    email: string,
    otp: string,
  ): Promise<void> {
    const fromEmail =
      this.configService.getOrThrow<string>(
        'MAILTRAP_FROM_EMAIL',
      );

    const fromName =
      this.configService.get<string>(
        'MAILTRAP_FROM_NAME',
        'SmartFinds',
      );

    try {
      await this.transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,

        to: email,

        subject: 'Your SmartFinds login code',

        text: `
Your SmartFinds verification code is:

${otp}

This code will expire in 10 minutes.

If you did not try to log in to your SmartFinds account, you can safely ignore this email.
        `.trim(),

        html: `
          <div style="
            font-family: Arial, sans-serif;
            max-width: 520px;
            margin: 0 auto;
            padding: 32px;
            color: #111827;
          ">

            <h2 style="margin-bottom: 8px;">
              SmartFinds Login Verification
            </h2>

            <p style="color: #6b7280;">
              Use the verification code below to continue
              signing in to your SmartFinds account.
            </p>

            <div style="
              margin: 28px 0;
              padding: 18px;
              background: #f5f3ff;
              border-radius: 12px;
              text-align: center;
              font-size: 32px;
              font-weight: 700;
              letter-spacing: 8px;
              color: #7129b0;
            ">
              ${otp}
            </div>

            <p style="color: #6b7280;">
              This code expires in <strong>10 minutes</strong>.
            </p>

            <p style="
              margin-top: 24px;
              font-size: 13px;
              color: #9ca3af;
            ">
              If you did not try to log in, you can safely
              ignore this email.
            </p>

          </div>
        `,
      });
    } catch (error) {
      console.error(
        'Mailtrap send email error:',
        error,
      );

      throw new InternalServerErrorException(
        'Unable to send verification email. Please try again.',
      );
    }
  }

  async sendEmailVerificationOtp(
    email: string,
    otp: string,
  ): Promise<void> {
    const fromEmail =
      this.configService.getOrThrow<string>(
        'MAILTRAP_FROM_EMAIL',
      );

    const fromName =
      this.configService.get<string>(
        'MAILTRAP_FROM_NAME',
        'SmartFinds',
      );

    try {
      await this.transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,

        to: email,

        subject: 'Verify your SmartFinds email address',

        text: `
Your SmartFinds email verification code is:

${otp}

This code will expire in 10 minutes.

If you did not create a SmartFinds account, you can safely ignore this email.
        `.trim(),

        html: `
          <div style="
            font-family: Arial, sans-serif;
            max-width: 520px;
            margin: 0 auto;
            padding: 32px;
            color: #111827;
          ">

            <h2 style="margin-bottom: 8px;">
              Verify your email
            </h2>

            <p style="color: #6b7280;">
              Use the verification code below to confirm your
              SmartFinds email address.
            </p>

            <div style="
              margin: 28px 0;
              padding: 18px;
              background: #f5f3ff;
              border-radius: 12px;
              text-align: center;
              font-size: 32px;
              font-weight: 700;
              letter-spacing: 8px;
              color: #7129b0;
            ">
              ${otp}
            </div>

            <p style="color: #6b7280;">
              This code expires in <strong>10 minutes</strong>.
            </p>

            <p style="
              margin-top: 24px;
              font-size: 13px;
              color: #9ca3af;
            ">
              If you did not create this account, you can safely
              ignore this email.
            </p>

          </div>
        `,
      });
    } catch (error) {
      console.error(
        'Mailtrap send email error:',
        error,
      );

      throw new InternalServerErrorException(
        'Unable to send verification email. Please try again.',
      );
    }
  }

  async sendPasswordResetEmail(
    email: string,
    resetUrl: string,
  ): Promise<void> {
    const fromEmail =
      this.configService.getOrThrow<string>(
        'MAILTRAP_FROM_EMAIL',
      );

    const fromName =
      this.configService.get<string>(
        'MAILTRAP_FROM_NAME',
        'SmartFinds',
      );

    try {
      await this.transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,

        to: email,

        subject:
          'Reset your SmartFinds password',

        text: `
We received a request to reset your SmartFinds password.

Click the link below to create a new password:

${resetUrl}

This link will expire in 1 hour.

If you did not request a password reset, you can safely ignore this email.
      `.trim(),

        html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 520px;
          margin: 0 auto;
          padding: 32px;
          color: #111827;
        ">

          <h2 style="margin-bottom: 8px;">
            Reset your SmartFinds password
          </h2>

          <p style="color: #6b7280; line-height: 1.6;">
            We received a request to reset your
            SmartFinds account password.
          </p>

          <div style="
            margin: 28px 0;
            text-align: center;
          ">
            <a
              href="${resetUrl}"
              style="
                display: inline-block;
                padding: 13px 24px;
                background: #7129b0;
                color: #ffffff;
                text-decoration: none;
                border-radius: 10px;
                font-weight: 600;
              "
            >
              Reset Password
            </a>
          </div>

          <p style="
            color: #6b7280;
            font-size: 14px;
            line-height: 1.6;
          ">
            This password reset link will expire
            in <strong>1 hour</strong>.
          </p>

          <p style="
            margin-top: 24px;
            color: #9ca3af;
            font-size: 13px;
            line-height: 1.6;
          ">
            If you did not request a password reset,
            you can safely ignore this email.
          </p>

        </div>
      `,
      });
    } catch (error) {
      console.error(
        'Password reset email error:',
        error,
      );

      throw new InternalServerErrorException(
        'Unable to send password reset email. Please try again.',
      );
    }
  }

}