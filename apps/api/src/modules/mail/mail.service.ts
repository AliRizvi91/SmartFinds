import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private readonly resend: Resend;
  private readonly fromEmail: string;
  private readonly fromName: string;

  constructor(
    private readonly configService: ConfigService,
  ) {
    const apiKey =
      this.configService.getOrThrow<string>(
        'RESEND_API_KEY',
      );

    this.resend = new Resend(apiKey);

    this.fromEmail =
      this.configService.getOrThrow<string>(
        'RESEND_FROM_EMAIL',
      );

    this.fromName =
      this.configService.get<string>(
        'RESEND_FROM_NAME',
        'SmartFinds',
      );
  }

  /**
   * Send Login OTP
   */
  async sendLoginOtp(
    email: string,
    otp: string,
  ): Promise<void> {
    try {
      const { data, error } =
        await this.resend.emails.send({
          from: `"${this.fromName}" <${this.fromEmail}>`,
          to: [email],
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

      if (error) {
        console.error(
          'Resend login OTP error:',
          error,
        );

        throw new Error(error.message);
      }

      console.log(
        'Login OTP email sent:',
        data?.id,
      );
    } catch (error) {
      console.error(
        'Login OTP email error:',
        error,
      );

      throw new InternalServerErrorException(
        'Unable to send verification email. Please try again.',
      );
    }
  }

  /**
   * Send Email Verification OTP
   */
  async sendEmailVerificationOtp(
    email: string,
    otp: string,
  ): Promise<void> {
    try {
      const { data, error } =
        await this.resend.emails.send({
          from: `"${this.fromName}" <${this.fromEmail}>`,
          to: [email],
          subject:
            'Verify your SmartFinds email address',

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
                Use the verification code below to confirm
                your SmartFinds email address.
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
                If you did not create this account, you can
                safely ignore this email.
              </p>

            </div>
          `,
        });

      if (error) {
        console.error(
          'Resend email verification error:',
          error,
        );

        throw new Error(error.message);
      }

      console.log(
        'Verification email sent:',
        data?.id,
      );
    } catch (error) {
      console.error(
        'Email verification error:',
        error,
      );

      throw new InternalServerErrorException(
        'Unable to send verification email. Please try again.',
      );
    }
  }

  /**
   * Send Password Reset Email
   */
  async sendPasswordResetEmail(
    email: string,
    resetUrl: string,
  ): Promise<void> {
    try {
      const { data, error } =
        await this.resend.emails.send({
          from: `"${this.fromName}" <${this.fromEmail}>`,
          to: [email],
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

              <p style="
                color: #6b7280;
                line-height: 1.6;
              ">
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

      if (error) {
        console.error(
          'Resend password reset error:',
          error,
        );

        throw new Error(error.message);
      }

      console.log(
        'Password reset email sent:',
        data?.id,
      );
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
