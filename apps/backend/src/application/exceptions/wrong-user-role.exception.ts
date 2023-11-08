import { ForbiddenException } from '@nestjs/common';
import { UserRoleEnum } from '../../types/user-role.enum';

export class WrongUserRoleException extends ForbiddenException {
  constructor(requiredRole: UserRoleEnum) {
    super(`Wrong user role. Only users with <${requiredRole}> role are acceptable.`);
  }
}
