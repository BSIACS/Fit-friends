import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { decode } from 'jsonwebtoken';
import { TokenPayload } from '../../types/token-payload.interface';
import { UserRoleEnum } from '../../types/user-role.enum';
import { WrongUserRoleException } from '../exceptions/wrong-user-role.exception';

@Injectable()
export class IsTrainerRoleGuard implements CanActivate {

  constructor(){
    console.log('IsUserRoleGuard');

  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization'].split(' ')[1];

    const payload = decode(token) as TokenPayload;
    console.log(payload.role);
    if(payload?.role && payload.role === UserRoleEnum.TRAINER){
      return true;
    }

    throw new WrongUserRoleException(UserRoleEnum.TRAINER);
  }
}
