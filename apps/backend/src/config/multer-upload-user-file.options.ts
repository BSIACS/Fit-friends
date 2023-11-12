import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';


export const multerUploadUserFileOptions: MulterOptions = {
  storage: diskStorage({
    destination: './assets/img/content',
  })
}
