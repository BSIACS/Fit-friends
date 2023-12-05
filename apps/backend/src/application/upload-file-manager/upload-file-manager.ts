import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailConfig } from '../../config/mail.config';
import { UploadFileManagerService } from './upload-file-manager.service';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailConfig())
  ],
  providers: [
    UploadFileManagerService
  ],
  exports: [
    UploadFileManagerService
  ]
})
export class UploadFileManagerModule {}
