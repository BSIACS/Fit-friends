import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { UserRoleEnum } from '../types/user-role.enum';
import { CreateTrainerDto } from '../application/controllers/users/dto/create-trainer.dto';
import { CreateUserDto } from '../application/controllers/users/dto/create-user.dto';



@Injectable()
export class UserValidationPipe implements PipeTransform {

  async transform(value: any, { type }: ArgumentMetadata) {

    if (type !== 'body') {
      return value;
    }

    let errors: ValidationError[] = [];

    if(value['role'] === UserRoleEnum.USER){
      const object = plainToClass(CreateUserDto, value);
      errors = await validate(object);
    }
    else if(value['role'] === UserRoleEnum.TRAINER){
      const object = plainToClass(CreateTrainerDto, value);
      errors = await validate(object);
    }
    else{
      errors.push({property: 'role', constraints: {'isEnum': 'role must be one of the following values: trainer, user.'}})
    }

    if (errors.length > 0) {
      throw new HttpException(`Validation failed: ${this.formatErrors(errors)}`, HttpStatus.BAD_REQUEST);
    }

    return value;
  }

  private isEmpty(value: any) {
    if (Object.keys(value).length < 1) {
      return true
    }
    return false
  }

  private formatErrors(errors: ValidationError[]) {
    return errors.map(error => {
      for (const key in error.constraints) {
        return error.constraints[key]
      }
    }).join(', ');
  }
}
