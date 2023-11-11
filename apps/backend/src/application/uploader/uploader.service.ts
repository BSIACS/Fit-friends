import { Injectable } from '@nestjs/common';
import  multer, { Multer } from 'multer';

@Injectable()
export class UploaderService{
  private readonly multer;

  constructor(){
    this.multer = multer;
  }
}
