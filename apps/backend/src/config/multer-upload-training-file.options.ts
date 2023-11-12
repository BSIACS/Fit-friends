import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

export const multerUploadTrainingFileOptions: MulterOptions = {
  storage: diskStorage({
    destination: './assets/video/content',
  })
}
