import { Injectable, Logger } from '@nestjs/common';
import { existsSync, mkdirSync, rm, writeFile } from 'fs';

const UPLOADS_FILES_PATH = 'dist/apps/backend/assets';

@Injectable()
export class UploadFileManagerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(UploadFileManagerService.name);

    if (!existsSync(`${UPLOADS_FILES_PATH}/users-data`)) {
      mkdirSync(`${UPLOADS_FILES_PATH}/users-data`);
    }
  }

  public saveAvatar(userId: string, file: Express.Multer.File) {
    if (!existsSync(`${UPLOADS_FILES_PATH}/users-data/${userId}`)) {
      mkdirSync(`${UPLOADS_FILES_PATH}/users-data/${userId}`);
    }

    if (file.buffer) {
      writeFile(`${UPLOADS_FILES_PATH}/users-data/${userId}/${file.originalname}`, file.buffer, 'ascii', (error) => {
        if (error) {
          throw error;
        };
      });
    }
  }

  public saveTrainingVideoDemo(trainingId: string, file: Express.Multer.File) {
    if (!existsSync(`${UPLOADS_FILES_PATH}/training-data/${trainingId}`)) {
      mkdirSync(`${UPLOADS_FILES_PATH}/training-data/${trainingId}`);
    }

    if (file.buffer) {
      writeFile(`${UPLOADS_FILES_PATH}/training-data/${trainingId}/${file.originalname}`, file.buffer, 'ascii', (error) => {
        if (error) {
          throw error;
        };
      });
    }
  }

  public saveCertificate(userId: string, file: Express.Multer.File) {
    if (!existsSync(`${UPLOADS_FILES_PATH}/users-data/${userId}/certificates`)) {
      mkdirSync(`${UPLOADS_FILES_PATH}/users-data/${userId}/certificates`);
    }
    if (file.buffer) {
      writeFile(`${UPLOADS_FILES_PATH}/users-data/${userId}/certificates/${file.originalname}`, file.buffer, 'ascii', (error) => {
        if (error) {
          throw error;
        };
      });
    }
  }

  public updateCertificate(userId: string, file: Express.Multer.File) {
    if (!existsSync(`${UPLOADS_FILES_PATH}/users-data/${userId}/certificates`)) {
      mkdirSync(`${UPLOADS_FILES_PATH}/users-data/${userId}/certificates`);
    }
    if (file.buffer) {
      writeFile(`${UPLOADS_FILES_PATH}/users-data/${userId}/certificates/${file.originalname}`, file.buffer, {encoding: 'ascii', flag: 'w'}, (error) => {
        if (error) {
          throw error;
        };
      });
    }
  }

  public deleteCertificate(userId: string, fileName: string) {
    if (!existsSync(`${UPLOADS_FILES_PATH}/users-data/${userId}/certificates`)) {
      mkdirSync(`${UPLOADS_FILES_PATH}/users-data/${userId}/certificates`);
    }
    if (fileName) {
      rm(`${UPLOADS_FILES_PATH}/users-data/${userId}/certificates/${fileName}`, {}, (error) => {
        if (error) {
          throw error;
        };
      });
    }
  }
}
