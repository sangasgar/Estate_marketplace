import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
        url,
      },
    });
  }
  async sendLead(dtoEmail) {
    await this.mailerService.sendMail({
      to: 'info@tobuyestate.com',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Заявка с сайта на подбор недвижимости',
      template: './leads', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: dtoEmail.name,
        phone: dtoEmail.phone,
        email: dtoEmail.email,
        comment: dtoEmail.comment,
      },
    });
  }
}
