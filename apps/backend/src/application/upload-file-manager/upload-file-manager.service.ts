import { Injectable, Logger } from '@nestjs/common';
import { error } from 'console';
import { existsSync, mkdirSync, writeFile } from 'fs';
import { getImageType } from '../../utils/string';

const UPLOADS_FILES_PATH = 'dist/apps/backend/assets';

@Injectable()
export class UploadFileManagerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(UploadFileManagerService.name);

    // if (!existsSync('apps/backend/src/public/')) {
    //   mkdirSync('apps/backend/src/public/');
    // }

    if (!existsSync(`${UPLOADS_FILES_PATH}/users-data`)) {
      mkdirSync(`${UPLOADS_FILES_PATH}/users-data`);
    }
  }

  public saveAvatar(userId: string, file: Express.Multer.File) {
    if (!existsSync(`${UPLOADS_FILES_PATH}/users-data/${userId}`)) {
      mkdirSync(`${UPLOADS_FILES_PATH}/users-data/${userId}`);
    }
    console.log('CHECK - ', file.filename);


    if (file.buffer) {
      writeFile(`${UPLOADS_FILES_PATH}/users-data/${userId}/${file.originalname}`, file.buffer, 'ascii', (error) => {
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
