import { Injectable, Logger } from '@nestjs/common';
import { error } from 'console';
import { existsSync, mkdirSync, writeFile } from 'fs';
import { getImageType } from '../../utils/string';

const UPLOADS_FILES_PATH = 'apps/backend/src/public';

@Injectable()
export class UploadFileManagerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(UploadFileManagerService.name);

    if (!existsSync('apps/backend/src/public/')) {
      mkdirSync('apps/backend/src/public/');
    }

    if (!existsSync('apps/backend/src/public/users-data')) {
      mkdirSync('apps/backend/src/public/users-data');
    }
  }

  public saveAvatar(userId: string, file: Express.Multer.File) {
    if (!existsSync(`${UPLOADS_FILES_PATH}/users-data/${userId}`)) {
      mkdirSync(`${UPLOADS_FILES_PATH}/users-data/${userId}`);
    }

    if (file.buffer) {
      writeFile(`${UPLOADS_FILES_PATH}/users-data/${userId}/avatar.${getImageType(file.mimetype)}`, file.buffer, 'ascii', (error) => {
        if (error) {
          throw error;
        };
      });
    }
  }

  public saveCertificate(userId: string, file: Express.Multer.File) {
    if (!existsSync(`${UPLOADS_FILES_PATH}/users-data/${userId}`)) {
      mkdirSync(`${UPLOADS_FILES_PATH}/users-data/${userId}`);
    }
    if (file.buffer) {
      writeFile(`${UPLOADS_FILES_PATH}/users-data/${userId}/${file.originalname}.pdf`, file.buffer, 'ascii', (error) => {
        if (error) {
          throw error;
        };
      });
    }

    console.log(file);
  }
}
