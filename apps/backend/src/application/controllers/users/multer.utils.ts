import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

 const editFileName = (req, file, callback) => {
  const newName = `${new Date().valueOf().toString()}`;
  callback(null, newName);
  file.originalname = newName;
};

export const multerUploadUserFileOptions: MulterOptions = {
  storage: diskStorage({
    destination: './assets/img/content',
  })
}
