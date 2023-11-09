import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

export const EMAIL_NEW_TRAINING_AVAILABLE = 'Уведомление о новой тренировке';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNewTrainingNotification(trainerName: string, trainingName: string, subscribersEmails: string[]) {
    console.log(process.env.MAIL_SMTP_HOST);

    subscribersEmails.forEach((email) => {
      this.mailerService.sendMail({
        to: email,
        subject: EMAIL_NEW_TRAINING_AVAILABLE,
        template: './new-training-notification',
        context: {
          trainerName: `${trainerName}`,
          trainingName: `${trainingName}`,
        }
      });
    });


  }
}
