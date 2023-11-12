import { ArgumentMetadata, Inject, Injectable, PipeTransform, forwardRef } from '@nestjs/common';
import { UserRoleEnum } from '../../types/user-role.enum';
import { UsersService } from '../users/users.service';
import { UserExistsException } from '../exceptions/user-exists.exception';


@Injectable()
export class IsUserExistPipe implements PipeTransform {
  private readonly userRole: UserRoleEnum;

  constructor(@Inject(forwardRef(() => UsersService)) private userService: UsersService){}

  async transform(value, { type }: ArgumentMetadata) {

    if (type !== 'body') {
      return value;
    }

    if(await this.userService.isTrainerExist(value['email'])){
      throw new UserExistsException(value['email']);
    }

    if(await this.userService.isUserExist(value['email'])){
      throw new UserExistsException(value['email']);
    }

    return value;
  }
}
